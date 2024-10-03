const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot.'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('pong!');
    }
};