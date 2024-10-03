const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('length')
        .setDescription('Estimates the length of TOMORROW\'S DAY\'s main storyline.'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('We estimate that you\'ll need more than 5 hours to complete the game!');
    }
};