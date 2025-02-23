require("dotenv").config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");

const loadCommands = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            loadCommands(fullPath);
        } else if (file.name.endsWith(".js")) {
            const command = require(fullPath);
            client.commands.set(command.data.name, command);
        }
    }
};
loadCommands(commandsPath);

client.once("ready", () => {
    console.log(`Бот ${client.user.tag} запущен!`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "Произошла ошибка при выполнении команды!",
            ephemeral: true,
        });
    }
});

client.login(token);
