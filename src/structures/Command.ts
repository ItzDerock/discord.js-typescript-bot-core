import { ChatInputCommandInteraction, Client, PermissionResolvable, SlashCommandBuilder } from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10";

export type SlashCommandOptions = {
    requiredPermissions: PermissionResolvable[]
}

export default class SlashCommand {
    name: string;
    description: string;
    options: SlashCommandOptions | undefined;

    constructor(name: string, description: string, options?: SlashCommandOptions) {
        this.name = name;
        this.description = description;
        this.options = options;
    }

    exec(interaction: ChatInputCommandInteraction) {
        throw new Error("Method not implemented.");
    }

    build(client: Client, command: SlashCommandBuilder): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return command;
    }
}