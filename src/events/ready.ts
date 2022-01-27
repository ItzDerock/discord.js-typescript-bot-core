import { client } from '..';
import Event from '../structures/Event';
import { discordLogger } from '../utils/logger';

export default class ReadyEvent extends Event {
    constructor() { super('Ready', 'ready'); };

    async exec() {
        discordLogger.info(`🤖 Logged in as ${client?.user?.tag}!`);
        discordLogger.info(`📊 Currently in ${client?.guilds.cache.size} guilds.`);
    }
}