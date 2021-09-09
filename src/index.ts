import dotenv from "dotenv-safe";
dotenv.config();

import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const token = process.env.AUTH_TOKEN;

if (!token) {
  throw new Error("No token is provided");
}

client.once("ready", () => {
  console.log(process.env.AUTH_TOKEN);
  console.log("Ready!");
});

client.login(token);
