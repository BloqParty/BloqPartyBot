const { registerCommand } = require("../events/messageCreate");
const { GetPrisma } = require("../src/prisma");
const { Message } = require("discord.js");
const client = require("../src/client");

/**
 * 
 * @param { Message<boolean> } message 
 * @returns { { "roleId": string, "emojiId": string, "messageId": string} | null }
 */
async function createReactRole(message)
{
    await message.channel.sendTyping();

    const splitMsg = message.content.split(" ");
    const roleId = splitMsg[2];
    const messageId = splitMsg[3];
    const emojiId = splitMsg[4];
    const prisma = GetPrisma();

    if (await findReactRole(message, false) !== null)
    {
        await message.channel.send("Reaction already exists for this role");
        return null;
    }

    const role = await prisma.reactRole.create({
        data: {
            channelId: message.channelId,
            messageId,
            roleId,
            emojiId
        }
    });
    await message.channel.send("Created reaction role successfully");
    return role;
}

/**
 * @param { Message<boolean> } message 
 * @returns { boolean }
 */
async function updateReactRole(message)
{
    await message.channel.sendTyping();

    const splitMsg = message.content.split(" ");
    const roleId = splitMsg[2];
    const messageId = splitMsg[3];
    const emojiId = splitMsg[4];
    const prisma = GetPrisma();

    if (await findReactRole(message, false) === null)
    {
        await message.channel.send("Reaction role doesn't exist for this role");
        return false;
    }
    await prisma.reactRole.update({
        where: {
            roleId
        },
        data: {
            roleId,
            messageId,
            emojiId
        }
    });

    await message.channel.send("Updated reaction role");
    return true;
}

/**
 * @param { Message<boolean> } message 
 * @returns { boolean }
 */
async function removeReactRole(message)
{
    await message.channel.sendTyping();

    const roleId = message.content.split(" ")[2];
    const prisma = GetPrisma();

    if (await findReactRole(message, false) === null)
    {
        message.channel.send("Reaction role doesn't exist for this role");
        return false;
    }
    await prisma.reactRole.delete({ where: { roleId } });
    await message.channel.send("Removed reaction role successfully");
    return true;
}

/**
 * @param { Message<boolean> } message 
 * @param { boolean } sendMessages
 * @returns { { "roleId": string, "emojiId": string, "messageId": string} | null }
 */
async function findReactRole(message, sendMessages = true)
{
    if (sendMessages)
        await message.channel.sendTyping();

    const roleId = message.content.split(" ")[2];
    const role = await GetPrisma().reactRole.findUnique({ where: { roleId }});

    let emojiName;
    if (role !== null && sendMessages)
    {
        await message.guild.emojis.fetch(role.emojiId).then((emoji) => {
            emojiName = emoji;
        }).catch((err) => {});
    }
    
    if (role === null && sendMessages)
    {
        await message.channel.send("Reaction role doesn't exist for this role");
        return null;
    }
    if (sendMessages)
    {
        await message.channel.send("Reaction role found \n```json" +  
            `\n{` +
            `\n    "roleId": ${role.roleId}` +
            `\n    "messageId": ${role.messageId}` +
            `\n    "emojiId":  ${role.emojiId}` +
            `\n}` +
            "```" +
            `\nhttps://discord.com/channels/${process.env.GUILD_ID}/${role.channelId}/${role.messageId}` +
            `\n<:${emojiName}:${role.emojiId}>`
        );

    }

    return role;
}

module.exports = {
    init() 
    {
        registerCommand("!rr create", createReactRole);
        registerCommand("!rr update", updateReactRole);
        registerCommand("!rr remove", removeReactRole);
        registerCommand("!rr find", findReactRole);
    }
}