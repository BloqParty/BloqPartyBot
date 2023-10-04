module.exports = {
    eventName: "interactionCreate",
    async response(interaction)
    {
        if (!interaction.isChatInputCommand())
            return;

        const command = interaction.client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
        }
    }
}