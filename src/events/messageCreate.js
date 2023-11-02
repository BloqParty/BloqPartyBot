const { EmbedBuilder } = require("@discordjs/builders");
const { randomInt } = require("crypto");
const fs = require("fs");
const ROLEMSGACTIVE = false;

module.exports = {
    eventName: "messageCreate",
    async response(message)
    {
        if (message.author.bot) 
            return;

        if (message.content.startsWith("!say"))
        {
            let msg = message.content.slice(5);
            message.delete();
            message.channel.send(msg);
        }

        else if (message.author.id === "186608213305720833")
        {
            if (randomInt(10) === 1)
                message.react("🐟")
        }

        else if (ROLEMSGACTIVE && message.content === "!createrolesmsg" && message.author.id === "628480432467607552")
        {
            const roleIDs = JSON.parse(fs.readFileSync("./src/extras/reactroles.json"));

            let embed = new EmbedBuilder()
                .setTitle("Select Roles!")
                .setFields(
                    { name: "Server", value: " ", inline: true },
                    { name: "Leaderboards", value: "🔴 - BeatLeader \n🟡 - ScoreSaber", inline: true },
                    { name: "Platforms", value: "🥽 - Quest \n💻 - PCVR", inline: true },
                    

                    { name: "Content", value: "🤳 - TikTok        ▶️ - YouTube \n📸 - Instagram 🗨️ - Twitch", inline: true },
                    { name: "Categories", value: "🏃‍♀️ - Speed        💡 - Tech \n📈 - Accuracy  📳 - Vibro \n💃 - Dance        😎 - Casual", inline: true },
                    { name: " ", value: " ", inline: true },
                    
                    { name: "Skill", value: "🟪 - Pro        🟥 - Expert+ \n🟧 - Expert  🟨 - Hard \n🟩 - Normal 🟦 - Easy", inline: true },
                    { name: " ", value: " ", inline: true },
                    { name: " ", value: " ", inline: true },
                )
                .setColor(0xffc0cb);
            let msg = await message.client.channels.cache.get('1098019458653626429').send({ embeds: [ embed ] });
            
            for (const emojiName in roleIDs)
                msg.react(emojiName);
        }
        else if (message.content.length > 20000 && message.author.id === "628480432467607552")
        {
            const msg = await message.channel.send("React to any of these to get the colour role of choice");
            const roleIDs = JSON.parse(fs.readFileSync("./src/extras/colourroles.json"));
            for (const emojiName in roleIDs)
                msg.react(message.client.guilds.cache.get("1169158846690902136").emojis.cache.get(emojiName));
            
        }
    }
}