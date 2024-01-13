import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("yourmum")
    .setDescription("Replies `your mum`");

export async function execute(interaction: CommandInteraction)
{
    interaction.reply("Your mum");
}