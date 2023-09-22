const fs = require("fs");

module.exports = {
    eventName: "messageReactionAdd",
    async response(reaction, user)
    {
        if (user.bot) return;

        const roleIDs = JSON.parse(fs.readFileSync("./src/extras/reactroles.json"));
        if (reaction.emoji.name in roleIDs && reaction.message.id === "1154863931676971048")
        {
            const guild = await reaction.client.guilds.fetch("1096778383217664001");
            const roles = guild.roles.cache;
            const member = await guild.members.fetch(user.id);

            member.roles.add(roles.get(roleIDs[reaction.emoji.name]));
            console.log(`[Events | messageReactionAdd] Adding "${roles.get(roleIDs[reaction.emoji.name]).name}" to ${user.username} (${user.id})`);
        }
    }
}