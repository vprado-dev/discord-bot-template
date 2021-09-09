import dotenv from "dotenv-safe";
dotenv.config();

import { Client, Collection, Intents } from "discord.js";
import fs from "fs-extra";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const token = process.env.AUTH_TOKEN;

const cmdFiles = fs.readdirSync("src/commands");

for (const file of cmdFiles) {
  const command = require(`./commands/${file}`).default;
  client.commands.set(command.data.name, command);
}

client.once("ready", async () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
