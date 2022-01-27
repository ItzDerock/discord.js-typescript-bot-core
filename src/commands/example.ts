import Command from "../structures/Command";
import { Message } from "discord.js";
import { primaryEmbed } from "../utils/embeds";

export default class ExampleCommand extends Command {
    constructor() {
        super("example", "An example command.");
    }

    exec(message: Message, args: string[]) {
        message.reply({
            embeds: [
                primaryEmbed('', "Yay this works! " + (args.length > 0 ? ` ${args.join(' ')}` : ''))
            ]
        });
    }
}