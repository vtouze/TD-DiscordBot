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
        .setDescription('Sends the supported languages link'),
    async execute(interaction) {
        await interaction.reply('Here\'s the list of supported languages: https://example.com/languages');
    }
};
