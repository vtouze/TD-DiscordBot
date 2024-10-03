const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kickstarter')
        .setDescription('Sends the official kickstarter for TOMORROW\'S DAY!'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('https://www.kickstarter.com/projects/splendeed/tomorrows-day');
    }
};