import { Client } from "discord.js";

export default class SlashCommand {
    name: string;
    event: string;

    constructor(name: string, event: string) {
        this.name = name;
        this.event = event;
    }

    exec() {
        throw new Error("Method not implemented.");
    }

    register(client: Client) {
        client.on(this.name, this.exec);
    }

    unregister(client: Client) {
        client.removeListener(this.name, this.exec);
    }
}