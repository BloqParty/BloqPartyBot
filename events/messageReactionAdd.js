const { Events, MessageReaction, User } = require("discord.js");
const { GetPrisma } = require("../src/prisma");
const client = require("../src/client");

module.exports = {
    eventName: Events.MessageReactionAdd,
    /**
     * @param { MessageReaction } reaction
     * @param { User } user
     */
    async execute(reaction, user)
    {
        if (user.bot)
            return;

        const reactRole = await GetPrisma().reactRole.findFirst({
            where: {
                emojiId: reaction.emoji.id ?? reaction.emoji.name,
                messageId: reaction.message.id
            }
        });

        if (reactRole === null)
            return;

        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        const role = guild.roles.cache.get(reactRole.roleId);
        guild.members.cache.get(user.id).roles.add(role);
    }
}