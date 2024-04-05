const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    async isMessageInFilter(message)
    {
        const filter = fs.readFileSync("./data/messageFilter.txt").toString().split('\\n');

        for (let line of filter)
        {
            if (message.content.includes(line) && line.length > 1)
            {
                message.delete();
                let messages = []
                let index = 0;
                while (index < message.content.length) {
                    messages.push(message.content.substring(index, index + 999));
                    index += 999;
                }
                let embed = new EmbedBuilder()
                    .setTitle(`Filtered message`)
                    .addFields(
                        { name: "__**Channel:**__", value: `<#${message.channelId}> \`${message.channelId}\``, inline: true },
                        { name: "__**User:**__", value: `<@${message.author.id}> \`${message.author.username}\` (\`${message.author.id}\`)`, inline: true },
                        { name: "__**Filtered Content:**__", value: `\`${line}\``, inline: true }
                    )
                    .setColor(0xff0000);
                for (let i = 0; i < messages.length; i++)
                    embed.addFields( { name: `__**Message Content ${i + 1}/${messages.length}:**__`, value: `\`\`\`${messages[i]}\`\`\`` } );
                message.client.channels.cache.get(process.env.SPAM_CHANNEL).send({ embeds: [ embed ] });
                return false;
            }
        }
        return true;
    },

    async addPhraseToFilter(content)
    {
        let file = fs.readFileSync("./data/messageFilter.txt");
        if (!file.includes(content))
        {
            file += "\\n" + content;
            fs.writeFileSync("./data/messageFilter.txt", file);
            return true;
        }
        return false;
    },

    async removePhraseFromFilter(content)
    {
        let file = fs.readFileSync("./data/messageFilter.txt");
        if (file.includes(content))
        {
            fs.writeFileSync("./data/messageFilter.txt", file.toString().replace("\\n" + content, ""));
            return true;
        }
        return false;
    }
}