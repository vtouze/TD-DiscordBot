const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'welcome',
    description: 'Sends the TOMORROW\'S DAY Discord welcome message',

    async execute(message, args, Discord, client) {
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setTitle(':flag_us: Welcome to the official TOMORROW\'S DAY Discord server!')
            .setDescription(`This is the hub for talking about TOMORROW'S DAY and all related stuff!\n\n` +
                `**INVITE LINK**:\n` +
                `[TOMORROW'S DAY DISCORD SERVER](https://discord.gg/qJ3uan4TBG)\n` +
                `----------------------------------------------------------------\n` +
                `**Social Media**\n` +
                `[Splendeed Studio official website](https://leomargueritte.squarespace.com/tomorrows-day)\n` +
                `[YouTube](https://www.youtube.com/channel/UCMIsDg-X0EKKYk4sIjS-wyQ)\n` +
                `[Twitter](https://twitter.com/splendeed_inc)\n` +
                `[Instagram](https://www.instagram.com/splendeed.inc/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D)\n` +
                `[Linkedin](https://www.linkedin.com/company/splendeed%C2%AE/posts/?feedView=all)\n` +
                `[Steam](https://store.steampowered.com/app/3134910/TOMORROWS_DAY/?)\n` +
                `[Ulule](https://www.ulule.com/tomorrowsday/)`
            )
            .setFooter({ text: 'Thank you for joining!' });

        try {
            await message.channel.send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.error('Failed to send welcome message:', error);
        }
    },
};