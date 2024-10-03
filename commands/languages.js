const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('languages')
        .setDescription('Get a list of all the languages supported in TOMORROW\'S DAY!'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('The game will feature English voice-overs and text in both English and French 🇬🇧 🇫🇷.');
    }
};