const { Events } = require("discord.js");

module.exports = {
    eventName: Events.ClientReady,
    async execute(client) {
        console.log(`[Events | ${Events.ClientReady}] ${client.user?.username} is online`);
    }
} 