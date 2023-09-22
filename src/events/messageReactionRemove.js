const fs = require("fs");

module.exports = {
    eventName: "messageReactionRemove",
    async response(reaction, user)
    {
        if (user.bot) return;

        const roleIDs = JSON.parse(fs.readFileSync("./src/extras/reactroles.json"));
        if (reaction.emoji.name in roleIDs && reaction.message.id === "1154863931676971048")
        {
            const guild = await reaction.client.guilds.fetch("1096778383217664001");
            const roles = guild.roles.cache;
            const member = await guild.members.fetch(user.id);

            member.roles.remove(roles.get(roleIDs[reaction.emoji.name]));
            console.log(`[Events | messageReactionRemove] Removing "${roles.get(roleIDs[reaction.emoji.name]).name}" from ${user.username} (${user.id})`);
        }
    }
}