require("dotenv").config();

const { Client, GatewayIntentBits, Collection, REST, Routes, Events, Partials } = require("discord.js");
const fs = require("fs");

function main()
{
    const client = new Client({
        intents: [ 
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.DirectMessages
        ],
        partials: [
            Partials.Message,
            Partials.Channel,
            Partials.Reaction
        ],
    });

    setupEvents(client);
    setupCommands(client);

    //client.on(Events.MessageCreate, (m) => { m.react()})
    
    client.login(process.env.DISCORD_TOKEN);
}

function setupEvents(client)
{
    const eventFiles = fs.readdirSync("./src/events").filter(f => f.endsWith(".js"));
    console.log(eventFiles);
    for (let i = 0; i < eventFiles.length; i++)
    {
        const event = require("./events/" + eventFiles[i]);
        if ("eventName" in event && "response" in event)
        {
            console.log(`[Events] Adding event onto "${event.eventName}"`);
            client.on(event.eventName, event.response);
        }
    }
}

function setupCommands(client)
{
    client.commands = new Collection();

    const commands = [];
    const commandFiles = fs.readdirSync("./src/commands").filter(f => f.endsWith(".js"));
    console.log(commandFiles);

    for (let i = 0; i < commandFiles.length; i++)
    {
        const command = require("./commands/" + commandFiles[i]);
        commands.push(command.command.toJSON());

        if ("command" in command && "execute" in command)
        {
            console.log(`[Commands] Adding command for "${command.command.name}"`);
            client.commands.set(command.command.name, command);
        }
    }

    const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            await rest.put( Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: commands
            });
        }
        catch (error) {
            console.error(error);
        }
    })();
}

main();