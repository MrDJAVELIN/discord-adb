require("dotenv").config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

function loadCommands(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            loadCommands(fullPath);
        } else if (file.endsWith(".js")) {
            const command = require(fullPath);
            commands.push(command.data.toJSON());
        }
    }
}

loadCommands(path.join(__dirname, "commands"));

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("Начинается регистрация (перезапись) команд...");

        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log("Команды успешно зарегистрированы!");
    } catch (error) {
        console.error(error);
    }
})();
