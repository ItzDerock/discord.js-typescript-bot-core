import { Client, Interaction, PermissionResolvable } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";

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

    exec(interaction: Interaction) {
        throw new Error("Method not implemented.");
    }

    build(client: Client): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}