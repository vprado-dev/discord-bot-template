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
  const rest = new REST({ version: "9" }).setToken(authToken);

  const commands: any[] = [];

  const cmdFiles = fs.readdirSync(pathCommands);

  for (const file of cmdFiles) {
    const command = require(path.join(pathCommands, file)).default;
    commands.push(command.data.toJSON());
  }

  try {
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
