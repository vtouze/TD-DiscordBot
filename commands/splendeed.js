const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'splendeed',
    description: 'Sends the official social media links of Splendeed',
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor('#F23838')
            .setTitle('     Splendeed\'s Social Media     ')
            .setDescription(`[YouTube](https://www.youtube.com/channel/UCMIsDg-X0EKKYk4sIjS-wyQ)\n
            [Twitter](https://twitter.com/splendeed_inc)\n
            [Instagram](https://www.instagram.com/splendeed.inc/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D)\n
            [Linkedin](https://www.linkedin.com/company/splendeed%C2%AE/posts/?feedView=all)\n
            [Steam](https://store.steampowered.com/app/3134910/TOMORROWS_DAY/?)\n
            [Splendeed Studio official website](https://leomargueritte.squarespace.com/tomorrows-day)\n`)
            .setFooter({ text: 'Follow Splendeed Studio on social media!' });

        await message.channel.send({ embeds: [embed] });
    }
};