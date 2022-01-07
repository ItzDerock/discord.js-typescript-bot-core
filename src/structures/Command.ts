import { Client, Interaction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";

export default class SlashCommand {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    exec(interaction: Interaction) {
        throw new Error("Method not implemented.");
    }

    build(client: Client): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        throw new Error("Method not implemented.");
    }
}