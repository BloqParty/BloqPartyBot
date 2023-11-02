const fs = require("fs");

module.exports = {
    eventName: "messageReactionAdd",
    async response(reaction, user)
    {
        if (user.bot) return;

        if (reaction.message.id === "1154863931676971048")
        {
            const roleIDs = JSON.parse(fs.readFileSync("./src/extras/reactroles.json"));
            if (reaction.emoji.name in roleIDs)
            {
                const guild = await reaction.client.guilds.fetch(process.env.GUILD_ID);
                const roles = guild.roles.cache;
                const member = await guild.members.fetch(user.id);

                member.roles.add(roles.get(roleIDs[reaction.emoji.name]));
                console.log(`[Events | messageReactionAdd] Adding "${roles.get(roleIDs[reaction.emoji.name]).name}" to ${user.username} (${user.id})`);
            }
        }

        if (reaction.message.id === "1169521695439208533")
        {
            const roleIDs = JSON.parse(fs.readFileSync("./src/extras/colourroles.json"));
            if (reaction.emoji.id in roleIDs)
            {
                const guild = await reaction.client.guilds.fetch(process.env.GUILD_ID);
                const roles = guild.roles.cache;
                const member = await guild.members.fetch(user.id);
                member.roles.add(roles.get(roleIDs[reaction.emoji.id]));
                console.log(`[Events | messageReactionAdd] Adding "${roles.get(roleIDs[reaction.emoji.id]).name}" to ${user.username} (${user.id})`);
            }
        }
        
        else if (reaction.emoji.name === "✅" && reaction.message.id === "1146607622980636803")
        {
            const guild = await reaction.client.guilds.fetch(process.env.GUILD_ID);
            const roles = guild.roles.cache;
            const member = await guild.members.fetch(user.id);

            member.roles.add(roles.get("1100471938951946380"));

            console.log(`[Events | messageReactionAdd] Adding "${roles.get("1100471938951946380").name}" to ${user.username} (${user.id})`);
        }
    }
}