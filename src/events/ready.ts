import { Client } from "discord.js";

const ready = async (client: Client) => {
  client.guilds.cache.get(process.env.GUILD_ID);

  client.user?.setPresence({
    status: "online",
    activities: [
      {
        type: "LISTENING",
        name: "discord.js!",
        url: "https://github.com/vprado-dev",
      },
    ],
  });
};

export default ready;
