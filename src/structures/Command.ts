import { Message, PermissionResolvable } from "discord.js";

export type CommandOptions = {
    requiredPermissions: PermissionResolvable[]
}

export default class PrefixedCommand {
    name: string;
    description: string;
    options: CommandOptions | undefined;

    constructor(name: string, description: string, options?: CommandOptions) {
        this.name = name;
        this.description = description;
        this.options = options;
    }

    exec(message: Message, args: string[]) {
        throw new Error("Method not implemented.");
    }
}