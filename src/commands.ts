import { REST, Routes } from "discord.js";
import { config } from "./config";
import * as logger from "./logger";

import * as yourmum from "./commands/yourmum";

export const commands = {
    yourmum
};

const rest = new REST({ version: "10" }).setToken(config.Token);

export async function deployCommands()
{
    logger.systemInfo("Refreshing application commands");

    const commandsData = Object.values(commands).map((command) => command.data);
    await rest.put(Routes.applicationCommands(config.ClientID), { body: commandsData});

    logger.systemInfo("Successfully refreshed application commands");
}