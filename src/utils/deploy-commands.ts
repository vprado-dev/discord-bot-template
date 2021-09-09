import dotenv from "dotenv-safe";
dotenv.config();

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs-extra";

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const authToken = process.env.AUTH_TOKEN;

const commands: any[] = [];

const cmdFiles = fs.readdirSync("src/commands/");

for (const file of cmdFiles) {
  const command = require(`../commands/${file}`).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(authToken);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
