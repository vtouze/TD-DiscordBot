/*module.exports = {
    name: 'trailer',
    description: 'Sends latest TOMORROW\'S DAY trailer!',
    execute(message, args){
        message.channel.send('https://www.youtube.com/watch?v=lJy-ZLZyu2Q&t=37s');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trailer')
        .setDescription('Sends the game trailer link'),
    async execute(interaction) {
        await interaction.reply('Here\'s the game trailer: https://example.com/trailer');
    }
};