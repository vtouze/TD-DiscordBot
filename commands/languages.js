/*module.exports = {
    name: 'languages',
    description: 'Get a list of all the languages supported in TOMORROW\'S DAY!',
    execute(message, args){
        message.channel.send('The game will feature English voice-overs and text in both English and French 🇬🇧 🇫🇷.');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('languages')
        .setDescription('Get a list of all the languages supported in TOMORROW\'S DAY!'),
    async execute(interaction) {
        await interaction.reply('The game will feature English voice-overs and text in both English and French 🇬🇧 🇫🇷.');
    }
};