import discord from 'discord.js';
import createLogger, { discordLogger } from '../utils/logger';

import { commands } from '..';
import Event from '../structures/Event';
import { errorEmbed } from '../utils/embeds';
import getConfig from '../utils/config';

const config = getConfig();

export default class CommandHandler extends Event {
    constructor() { super('Command', 'messageCreate'); };

    exec(message: discord.Message) {
        if(message.author.bot) return;
        if(message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();

        if(!command) return;

        const commandData = commands.get(command);
        if(!commandData) return;

        if(commandData.options?.requiredPermissions) {
            const userPermissions = message.member?.permissions;
            if(!userPermissions) {
                return message.reply({
                    embeds: [errorEmbed("", "You cannot use that command here.")]
                });
            }

            const missing = userPermissions.missing(commandData.options.requiredPermissions);
            if(missing.length > 0) {
                return message.reply({
                    embeds: [errorEmbed("", `You are lacking the following permissio${missing.length > 1 ? 's' : ''}: ` + missing.map(p => `\`${p}\``).join(', '))]
                });
            }
        }

        try {
            commandData.exec(message, args);
        } catch (error) {
            const cmdLogger = createLogger(commandData.name);
            cmdLogger.error(`Failed to run command ${commandData.name}:`, error);
            cmdLogger.error(`Command ran by ${message.author.tag} (${message.author.id}) in ${message.guild?.name ?? 'Not in guild'} (${message.guild?.id ?? 'N/A'})`);
            cmdLogger.error(`Command options:`, message.content);
        }
    }
}