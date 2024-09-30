/*module.exports = {
    name: 'length',
    description: 'Estimates the length of TOMORROW\'S DAY\'s main storyline.',
    execute(message, args){
        message.channel.send('We estimate that you\'ll need more than 5 hours to complete the game!');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('length')
        .setDescription('Estimates the length of TOMORROW\'S DAY\'s main storyline.'),
    async execute(interaction) {
        await interaction.reply('We estimate that you\'ll need more than 5 hours to complete the game!');
    }
};