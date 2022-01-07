import config from '../config.json';
import Discord from 'discord.js';

export const primaryEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ title, description, color: HEXToVBColor(config.embeds.primary) })

export const errorEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ title, description, color: HEXToVBColor(config.embeds.error) })

function HEXToVBColor(rrggbb: string) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
}