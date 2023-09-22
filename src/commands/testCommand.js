const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setName("yourmum")
        .setDescription("Says \"Your mum\""),
    async execute(interaction)
    {
        interaction.reply("Your mum");
    }
}