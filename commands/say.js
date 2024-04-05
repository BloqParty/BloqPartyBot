const { registerCommand } = require("../events/messageCreate");
const { GetPrisma } = require("../src/prisma");
const { Message } = require("discord.js");
const client = require("../src/client");

/**
 * 
 * @param { Message<boolean> } message 
 * @returns { null }
 */
async function sayMessage(message)
{
    await message.delete();
    await message.channel.sendTyping();

    const msg = message.content.slice(5);
    if (msg)
        message.channel.send(msg);
}

module.exports = {
    init() 
    {
        registerCommand("!say", sayMessage);
    }
}