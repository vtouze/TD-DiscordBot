const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'wishlist',
    description: 'Sends the TOMORROW\'S DAY Steam wishlist message with an image',

    async execute(message, args, Discord, client) {
        const imagePath = path.join(__dirname, '../wishlist.png');
        const imageAttachment = new AttachmentBuilder(imagePath);

        const wishlistEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setDescription(':flag_us: Add the game to your [Steam wishlist](https://store.steampowered.com/app/3134910/TOMORROWS_DAY/) :warning:')
            .setImage('attachment://image.png');

        try {
            await message.channel.send({ 
                embeds: [wishlistEmbed], 
                files: [imageAttachment] 
            });
        } catch (error) {
            console.error('Failed to send wishlist message with image:', error);
        }
    },
};
