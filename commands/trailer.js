const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trailer')
        .setDescription('Sends latest TOMORROW\'S DAY trailer!'),
    requiredRole: 'Patriots',
    async execute(interaction) {
        await interaction.reply('https://www.youtube.com/watch?v=lJy-ZLZyu2Q&t=37s');
    }
};