import { SlashCommandBuilder } from "@discordjs/builders";

const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    return interaction.reply("Pong!");
  },
};

export default ping;
