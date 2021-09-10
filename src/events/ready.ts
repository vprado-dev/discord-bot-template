import { Client } from "discord.js";

const ready = async (client: Client) => {
  client.guilds.cache.get(process.env.GUILD_ID);

  client.user?.setPresence({
    status: "online",
    activities: [],
  });
};

export default ready;
