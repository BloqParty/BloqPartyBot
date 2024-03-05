const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.GuildMember,
        Partials.Reaction,
        Partials.Message
    ]
});

//client.on("messageCreate", msg => msg.member.roles.resolveId(process.env.MOD_ROLE))

module.exports = client;