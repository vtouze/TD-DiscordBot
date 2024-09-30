/*module.exports = {
    name: 'kickstarter',
    description: 'Sends the official kickstarter for TOMORROW\'S DAY!',
    execute(message, args){
        message.channel.send('https://www.kickstarter.com/projects/splendeed/tomorrows-day');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kickstarter')
        .setDescription('Sends the official kickstarter for TOMORROW\'S DAY!'),
    async execute(interaction) {
        await interaction.reply('https://www.kickstarter.com/projects/splendeed/tomorrows-day');
    }
};