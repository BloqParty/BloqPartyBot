const { registerCommand } = require("../events/messageCreate");
const { Message, EmbedBuilder } = require("discord.js");

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
    {
        message.channel.send(msg);
        message.client.channels.cache.get(process.env.SPAM_CHANNEL).send({ embeds: [ 
            new EmbedBuilder()
                .setTitle(`"Say" Used`)
                .setColor(0xff0000)
                .addFields(
                    { name: "__**User:**__", value: `<@${message.author.id}> ${message.author.username} (${message.author.id})` },
                    { name: "__**Content:**__", value: "```" + msg + "```" }
                )
            ]
        });
    }
}

module.exports = {
    init() 
    {
        registerCommand("!say", sayMessage);
    }
}