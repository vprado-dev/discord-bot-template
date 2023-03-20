import { ActivityType, Client } from "discord.js";
import { deployCommands } from "../utils/deploy-commands";

const ready = async (client: Client) => {
  const guildIds = client.guilds.cache.map((guild) => guild.id);

  for (const guildId of guildIds) {
    await deployCommands(guildId);
  }

  client.user?.setPresence({
    status: "online",
    activities: [
      {
        type: ActivityType.Listening,
        name: "discord.js!",
        url: "https://github.com/vprado-dev",
      },
    ],
  });
};

export default ready;
