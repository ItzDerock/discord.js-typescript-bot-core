# Discord.js v13 Bot Skeleton/Core
This repository is a template for creating a Discord bot using Discord.js v13 with Slash Command support.

> This project is for people familiar with TypeScript and Discord.js. Do NOT use if you are unfamiliar with either.
> No Discord.js/TypeScript support will be given!
 
---
## Table of Contents
1. **Create a project**
    1. [With GitHub](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#creating-a-project-with-github)
    2. [Without GitHub](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#creating-a-project-without-github)
        1. [Using Git CLI](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#clone-the-repository-using-the-git-cli)
        2. [By Downloading](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#clone-the-repository-without-git)
2. [Creating Slash Commands](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#creating-slash-commands)
3. [Deploying/Registering Slash Commands](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#register-slash-commands)
4. [Creating Events](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#register-events)
5. [Access the Client object](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#accessing-the-client)
6. [Utils](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#util-functions)
    1. [Logging](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#logging-srcutilsloggerts)
    2. [Embeds](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#embed-utils-srcutilsembedsts)
    3. [Config](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#config-loader-srcutilsconfigts)
7. [Config File](https://github.com/ItzDerock/discord.js-typescript-bot-core/blob/main/README.md#config)

---

## Creating a project **with github**.
If you plan on using github in your project, simply click the `Use this template` button to get started.

## Creating a project **without github**.
Choose one of the following:
### Clone the repository using the Git CLI
1. Open a terminal in the folder you want to create the project in and run `git clone https://github.com/ItzDerock/discord.js-typescript-bot-core.git .`
### Clone the repository without Git
1. Click the `Code ▼` button on the top of this page and choose `Download ZIP`
2. Open the zip archive using whatever you want (Windows File Explorer, Winrar, 7z, etc).
3. Drag and drop all the files in `discord.js-typescript-bot-core-main` folder into your project root.

## Creating slash commands.
To create a slash command using this package, go into `./src/commands/`
Copy and paste the `example.ts` file.

### Changing the command name/description.
1. Change `super("example", "An example command.");`. The first argument is the command name, and the second is a command description.
2. A third optional paramemeter can be supplied with the following options:

| Key | Description | Default |
| :-- | :-- | :-- |
| `requiredPermissions` | An array of PermissionResolvables that contains the required permissions to use this command | `undefined` |

### Adding command options.
1. Add a function to the class called `build` that takes in one argument (client) and returns either `SlashCommandBuilder` from @discordjs/builders or `RESTPostAPIApplicationCommandsJSONBody` from discord-api-types.

Example command with a boolean and string option.
```js
import SlashCommand from "../structures/Command";
import { Client, CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";

export default class ExampleCommand extends SlashCommand {
    constructor() {
        super("example", "An example command.");
    }

    exec(interaction: CommandInteraction) {
        const boolean = interaction.options.getBoolean('boolean');
        const string = interaction.options.getString('string');

        interaction.reply({
            embeds: [
                primaryEmbed('', `boolean: ${boolean}\nstring: ${string}`)
            ]
        });
    }

    build(client: Client<boolean>): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .addBooleanOption(boolean => boolean.setName('boolean').setDescription('test boolean option').setRequired(true))
            .addStringOption(string => string.setName('string').setDescription('test string option').setRequired(true))
            .toJSON();

    }
}
```

## Register slash commands.
When you create a slash command, the bot will not automatically create it. 

To deploy all new slash commands, run `npm start deploy` or `node . deploy` (if built and you are in ./dist)

To deploy only certain commands, or to edit existing commands, run `npm start edit [command 1 name] [command 2 name] [...]`.

## Register events.
To register an event,
1. Create an `.ts` file in `./src/events`. You can look at `ready.ts` or `commands.ts` for a base.
2. Export a class that extends `Event` found in `./src/structures/Event.ts`.
3. In the `constructor()` run `super("Event friendly name (for logging)", "eventName in client.on")` (for example, `super("Slash commands", "interactionCreate")`)
4. Create a function `exec` that takes the arguments provided by the event.

Example Event:
```js
import { GuildMember } from 'discord.js';
import Event from '../structures/Event';
import { primaryEmbed } from '../utils/embeds';

export default class ReadyEvent extends Event {
    constructor() { super('Member Welcomes', 'guildMemberAdd'); };

    async exec(member: GuildMember) {
        const welcome = member.guild.channels.resolve('a cool channel');
        if(!welcome || !welcome.isText()) return;
        welcome.send({
            embeds: [
                primaryEmbed("New Member!", `Welcome <@${member.id}> to ${member.guild.name}!`)
            ]
        })
    }
}
```

## Accessing the `Client`
Simply import `./src/index.ts`. Client is not the default export, so you will need to extract the client property. (ex: `import { client } from "..";`).

## Util functions
### Logging (`./src/utils/logger.ts`)
Exports a `createLogger` function that allows you to create a logger named the first parameter.

Logs are saved in `./logs/` and each unique logger name has their own file. The logger is a combination of `bunyan` and `bunyan-format`.

**To disable logging, set the `NO_LOG_DIR` env var to something that is not null/falsy**

### Embed Utils (`./src/utils/embeds.ts`)
Exports `primaryEmbed` and `errorEmbed` functions to quickly create an embed that matches the color scheme used in other embeds. Functions take in two parameters: title, description.
### Config Loader (`./src/utils/config.ts`)
This bot uses a yml config type, and node.js does not support importing .yml files. 
To access the config, run the default exported function from `./src/utils/config.ts`

In this file you can also change the type definition for the config.

## Config
The config is a yml file that will be loaded from the current working directory.

Inside the config, you set your bot token with the `token` option.

You can also change the global embed style under `embeds.primary` and `embeds.error`. You can set stuff like `footer.text` to set a global footer.
