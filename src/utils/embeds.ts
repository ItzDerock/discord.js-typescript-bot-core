import Discord, { EmbedBuilder, resolveColor } from 'discord.js';
import getConfig from './config';

const config = getConfig();

export class ExtendedEmbed extends EmbedBuilder {
    constructor(data?: ConstructorParameters<typeof EmbedBuilder>[0]) {
        // allow hex colors
        if (data?.color && typeof data.color === 'string') {
            data.color = resolveColor(data.color);
        }

        // call super
        super(data);
    }

    // readd the methods that were removed
    public addField(name: string, value: string, inline: boolean = false) {
        this.addFields({ name, value, inline });
        return this;
    }
}

export const primaryEmbed = (title="", description="") => 
    new ExtendedEmbed({ ...config.embeds.primary, title, description })

export const errorEmbed = (title="", description="") => 
    new ExtendedEmbed({ ...config.embeds.error, title, description })