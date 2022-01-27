import { APIEmbed } from 'discord-api-types';
import createLogger from './logger';
import yaml         from 'js-yaml';
import fs           from 'fs';
import path         from 'path';

const logger = createLogger('config');

export type DiscordBotConfig = {
    token: string;
    prefix: string;
    embeds: {
        primary: APIEmbed
        error: APIEmbed
    }
}

var configCache: DiscordBotConfig | null;
export default function getConfig(): DiscordBotConfig {
    if(configCache) return configCache;

    try {
        const configFileContents = fs.readFileSync(path.resolve(process.cwd(), 'config.yml'), 'utf8');
        const configFileYaml     = yaml.load(configFileContents) as DiscordBotConfig;
        return configCache = configFileYaml;
    } catch (error) {
        logger.error(`Failed to load config.yml`, error);
        logger.error(`This error is fatal, and the bot will now exit.`);
        process.exit(1);
    }
}