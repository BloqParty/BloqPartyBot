import { Message, TextChannel } from "discord.js";
import { config } from "../config";
import { client } from "../client";

export const eventName = "messageDelete";
export function eventFunction(message: Message<boolean>)
{
    if (message.author.bot)
        return;

    if (message.channelId in config.LogChannelIgnore)
        return;

    const channel = client.channels.cache.find(channel => channel.id === config.LogChannel) as TextChannel;
    channel.send(`**${message.author.username} (${message.author.id})** has deleted a message in <#${message.channelId}> \`${message.content ?? "no message provided"}\``);
    
}