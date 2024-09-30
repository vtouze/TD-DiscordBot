/*module.exports = {
    name: 'ping',
    description: 'This is a ping command!',
    execute(message, args){
        message.channel.send('pong!');
    }
}*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot.'),
    async execute(interaction) {
        await interaction.reply('pong!');
    }
};