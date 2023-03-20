import dotenv from "dotenv-safe";
dotenv.config();

import { Client, Collection, IntentsBitField } from "discord.js";
import fs from "fs-extra";
import path from "path";

const client: any = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.commands = new Collection();

const pathCommands = path.join(__dirname, "commands");

const pathEvents = path.join(__dirname, "events");

const setup = async () => {
  const cmdFiles = await fs.readdir(pathCommands);
  console.log("[#LOG]", `Carregando o total de ${cmdFiles.length} comandos.`);

  cmdFiles.forEach((file) => {
    try {
      const command = require(path.join(pathCommands, file)).default;
      client.commands.set(command.data.name, command);
    } catch (err) {
      console.error(`[#ERROR] Impossivel executar comando ${file}: ${err}`);
    }
  });

  const evntFiles = await fs.readdir(pathEvents);
  console.log("[#LOG]", `Carregando o total de ${evntFiles.length} eventos.`);
  evntFiles.forEach((file) => {
    const eventName = file.split(".")[0];

    const event = require(path.join(pathEvents, file)).default;

    client.on(eventName, event.bind(null, client));
  });

  client.on("error", (err: any) => console.error("[#ERROR]", err));
  client.login(process.env.AUTH_TOKEN);
};

setup();
