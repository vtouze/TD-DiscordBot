const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ulule')
        .setDescription('Sends the official ulule for TOMORROW\'S DAY!'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('https://www.ulule.com/tomorrowsday/');
    }
};