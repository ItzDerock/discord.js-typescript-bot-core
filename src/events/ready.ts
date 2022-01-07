import { SlashCommandBuilder } from '@discordjs/builders';
import { client, commands } from '..';
import Event from '../structures/Event';
import { discordLogger } from '../utils/logger';

export default class ReadyEvent extends Event {
    constructor() { super('ready', 'ready'); };

    async exec() {
        discordLogger.info(`🤖 Logged in as ${client?.user?.tag}!`);
        discordLogger.info(`Currently in ${client?.guilds.cache.size} guilds.`);
        discordLogger.debug(`Current WS ping: ${client.ws.ping}`);

        if(process.argv[2] === "deploy" || process.argv[2] === "register") {
            const deploy = process.argv[2] === "deploy";

            discordLogger.info(`${deploy ? "Deploying" : "Registering"} ${commands.size} commands...`);
            discordLogger.debug(`Fetching application...`);
            await client.application?.commands.fetch();
            discordLogger.debug(`Fetched ${client.application?.commands.cache.size} commands.`);
            
            const commandsToDeploy = 
                !deploy ? commands.filter(c => client.application?.commands.cache.some(cmd => cmd.name === c.name) === false).values()
                : commands.values();

            for(const command of commandsToDeploy) {
                var data = command.build(client);
                if(data instanceof SlashCommandBuilder) data = data.toJSON();

                discordLogger.debug(`${deploy ? "Deploying" : "Registering"} command ${command.name}...`);
                await client.application?.commands.create(data);
                discordLogger.debug(`${deploy ? "Deployed" : "Registered"} command ${command.name}.`);
            }

            discordLogger.info(`${deploy ? "Deployed" : "Registered"} ${commands.size} commands.`);
        }
    }
}