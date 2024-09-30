/*module.exports = {
    name: 'plateforms',
    description: 'Get a list of all platforms where TOMORROW\'S DAY will be available!',
    execute(message, args){
        message.channel.send('TOMORROW\'S DAY will be available exclusively on PC 🖥️.');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('plateforms')
        .setDescription('Get a list of all platforms where TOMORROW\'S DAY will be available!'),
    async execute(interaction) {
        await interaction.reply('TOMORROW\'S DAY will be available exclusively on PC 🖥️.');
    }
};