import { CacheType, Interaction } from "discord.js";
import { commands } from "../commands";
import * as logger from "../logger";

export const eventName = "interactionCreate";
export function eventFunction(interaction: Interaction<CacheType>)
{
    if (!interaction.isCommand())
    {
        logger.eventError("interactionCreate", `Failed to execute command @ ${interaction.createdTimestamp}`);
        return;
    }

    const { commandName } = interaction;
    console.log(commandName);
    if (commands[commandName as keyof typeof commands])
        commands[commandName as keyof typeof commands].execute(interaction);
}