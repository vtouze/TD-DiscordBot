const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('plateforms')
        .setDescription('Get a list of all platforms where TOMORROW\'S DAY will be available!'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('TOMORROW\'S DAY will be available exclusively on PC 🖥️.');
    }
};