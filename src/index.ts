import Discord from 'discord.js';
import config from './config.json';
export const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS]
});

import fs from 'fs';
import { discordLogger } from './utils/logger';

discordLogger.info('Loading all events');
import Event from './structures/Event'
(async function loadEvents(dir="./events") {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const fileDesc = fs.statSync(`${dir}/${file}`);

        if (fileDesc.isDirectory()) {
            await loadEvents(`${dir}/${file}`);
            continue;
        }

        const event: Event = await import(`${dir}/${file}`);
        event.register(client);
        discordLogger.info(`Loaded event ${event.name} (${event.event})`);
    }
});

discordLogger.info("Loading all commands...");
import Command from './structures/Command';
export const commands = new Discord.Collection<string, Command>(); 
(async function loadCommands(dir="./commands/") {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fileDesc = fs.statSync(dir + file);

        if(fileDesc.isDirectory()) {
            await loadCommands(dir + file + "/");
            continue;
        }

        const command: Command = await import(dir + file);
        commands.set(command.name, command);

        discordLogger.info(`Loaded command ${command.name} from ${dir + file}`);
    }
});

discordLogger.info(`Connecting to Discord...`);
client.login(config.token);