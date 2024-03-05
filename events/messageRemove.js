const { Message, Events } = require("discord.js");
const { client } = require("../src/client");

/**
 * @param { Message<Boolean> } message
 */

module.exports =  {
    eventName: Events.MessageDelete,
    async execute(message) {
        
    }
}