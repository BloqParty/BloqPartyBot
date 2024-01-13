import { Client, GatewayIntentBits, Partials } from "discord.js";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.Reaction,
        Partials.Message,
        Partials.Channel
    ]
});