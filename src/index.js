require("dotenv").config();
const client = require("./client");
const fs = require("fs");

fs.readdirSync("./events")
    .filter(x => x.endsWith(".js"))
    .forEach(file => {
        const event = require("../events/" + file);
        if (event.eventName && event.execute) {
            client.on(event.eventName, event.execute);
            console.log(`[Events | Setup] Successfully attached "${file}" to "${event.eventName}"`);
        }
        else
            console.log(`[Events | Setup] "${file}" doesn't contain "eventName" or "execute"`);
    }
)

fs.readdirSync("./events/commands")
    .filter(x => x.endsWith(".js"))
    .forEach(file => {
        const command = require("../events/commands/" + file);
        if (command.init)
            command.init();
    }
)

client.login(process.env.TOKEN);