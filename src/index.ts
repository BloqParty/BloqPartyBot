import * as logger from "./logger";
import { client } from "./client";
import { Events } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import * as fs from "fs";

client.on(Events.ClientReady, client => logger.systemInfo(`${client.user.username} (${client.user.id}) is online`));

fs.readdir(`./src/events`, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err)
    {
        logger.systemError(`Error reading events directory`);
        return;
    }

    files
        .filter(file => file.endsWith(".ts"))
        .forEach((value) => {
        const event = require(`./events/${value}`);
        if ("eventName" in event && "eventFunction" in event)
        {
            logger.eventInfo(event.eventName, "Attaching function to event");
            client.on(event.eventName, event.eventFunction);
        }
    })
});

//client.on("messageDelete")

client.login(config.Token);