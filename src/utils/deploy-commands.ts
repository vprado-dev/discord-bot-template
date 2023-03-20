import dotenv from "dotenv-safe";
dotenv.config();

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs-extra";
import path from "path";

const clientId = process.env.CLIENT_ID;
const authToken = process.env.AUTH_TOKEN;
const pathCommands = path.join(__dirname, "..", "commands");

export const deployCommands = async (guildId: string) => {
  // @ts-ignore
  const rest = new REST({ version: '10' }).setToken(authToken);

  const commands = [];

  const cmdFiles = await fs.readdir(pathCommands);

  for (const file of cmdFiles) {
    const cmdPath = path.join(pathCommands, file);
    const command = require(cmdPath).default;
    commands.push(command.data.toJSON());
  }

  try {
    // @ts-ignore
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log(
      `Successfully registered application commands for guild ->${guildId}`,
    );
  } catch (error) {
    console.error(error);
  }
};
