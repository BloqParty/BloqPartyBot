import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
import { logChannel, logChannelIgnore } from "./extras/additionalSettings.json";

export const config = {
    "Token": DISCORD_TOKEN ?? "",
    "ClientID": CLIENT_ID ?? "",
    "GuildID": GUILD_ID ?? "",
    "LogChannel": logChannel ?? "",
    "LogChannelIgnore": logChannelIgnore ?? []
};