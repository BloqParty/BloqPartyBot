import { Message } from "discord.js";

export const eventName = "messageCreate";
export function eventFunction(message: Message<boolean>)
{
    if (message.author.bot)
        return;

    if (message.content.startsWith(`.say`))
    {
        message.delete();
        message.channel.send(message.content.slice(5));
    }
}