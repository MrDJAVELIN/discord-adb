const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("help menu"),
    async execute(interaction) {
        const emb = new EmbedBuilder();
        emb.setTitle("Help")
            .setDescription("COMMANDS:")
            .addFields({ name: "/ping", value: "ping command" })

        await interaction.reply({ ephemeral: true, embeds: [emb] });
    },
};
