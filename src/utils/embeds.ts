import Discord from 'discord.js';
import getConfig from './config';

const config = getConfig();

export const primaryEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ ...config.embeds.primary, title, description })

export const errorEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ ...config.embeds.error, title, description })