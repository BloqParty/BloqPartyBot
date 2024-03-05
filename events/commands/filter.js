const { addCommand } = require("../messageCreate")
const { addPhraseToFilter, removePhraseFromFilter } = require("../functions/filter");

async function addToFilter(message)
{
    if (message.member.roles.resolveId(process.env.MOD_ROLE) || message.member.roles.resolveId(process.env.ADMIN_ROLE))
    {
        message.channel.send(addPhraseToFilter(message.content.slice(12)) ? "Added `" + message.content.slice(12) + "` to the filter" : "Phrase is already on the filter");
        return true;
    }
    return false;
}

async function removeFromFilter(message)
{
    if (message.member.roles.resolveId(process.env.MOD_ROLE) || message.member.roles.resolveId(process.env.ADMIN_ROLE))
    {
        message.channel.send(removePhraseFromFilter(message.content.slice(15)) ? "Removed `" + message.content.slice(15) + "` from the filter" : "Phrase wasn't on the filter");
        return true;
    }
    return false;
}

module.exports = {
    init()
    {
        addCommand("!filter add", addToFilter, false);
        addCommand("!filter remove", removeFromFilter, false);
    }
}