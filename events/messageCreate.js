const { Message, Events } = require("discord.js");
const { client } = require("../src/client");
const { isMessageInFilter, addPhraseToFilter, removePhraseFromFilter } = require("../eventFunctions/messageFilter");


module.exports = {
    eventName: Events.MessageCreate,
    async execute(message)
    {
        if (message.author.bot)
            return;

        if (message.content.startsWith("!filter add"))
            if (message.member.roles.resolveId(process.env.MOD_ROLE) || message.member.roles.resolveId(process.env.ADMIN_ROLE))
                return message.channel.send(addPhraseToFilter(message.content.slice(12)) ? "Added `" + message.content.slice(12) + "` to the filter" : "Phrase is already on the filter");

        //if (message.content.startsWith("!filter remove"))
        //    if (message.member.roles.resolveId(process.env.MOD_ROLE) || message.member.roles.resolveId(process.env.ADMIN_ROLE))
        //        return message.channel.send(removePhraseFromFilter(message.content.slice(15) ? "Removed `" + message.content.slice(15) + "` from the filter" : "Phrase wasn't on the filter"));

        if (await isMessageInFilter(message) === false)
            return;
        /*if (message.content.startsWith("!createmacro"))
        {
            const msg = String(message.content.slice(13));
            const regex = /!(color|description|title|url|image)([\s\S]*?)(?=!(color|description|title|url|image)|$)/g;

            const macroName = msg.split(" ")[0];
            msg.replace(macroName, "");
            const match = regex.exec(msg);
            console.log(match);

            if (!match && msg.length > 5)
            {
                client.prisma.macro.create({
                    name: macroName,
                    embed: false,
                    content: msg
                })
            }
            else if (match)
            {
                const title = match[0];
                const description = match[1];
                const embed = match[2];
                const url = match[3];
                const a = match[4];
                console.log(title);
                console.log(description);
                console.log(embed);
                console.log(url);
                console.log(a);
            }
        }*/
    }
}