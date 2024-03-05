const { Events } = require("discord.js");
const { isMessageInFilter } = require("./functions/filter");

let commands = [];
module.exports = {
    eventName: Events.MessageCreate,
    async execute(message)
    {
        if (message.author.bot)
            return;

        commands.forEach(({ activation, funct }) => {
            if (message.content.startsWith(activation))
            {
                if (funct(message) === true)
                    return;
            }
        })

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
    },
    
    addCommand(activation, func)
    {
        if (typeof activation === "string" && typeof func === "function")
        {
            function funct(message) { return func(message); }
            commands.push({ activation, funct });
            console.log(`[Events | ${Events.MessageCreate}] Attached command ${func.name} to ${Events.MessageCreate}`);
        }
    }
}