require("dotenv").config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        (async () => {
            const commands = await rest.get(
                Routes.applicationCommands(clientId)
            );
            console.table(commands);
        })();
    } catch (error) {
        console.error(error);
    }
})();
