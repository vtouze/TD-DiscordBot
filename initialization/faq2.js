const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'faq2',
    description: 'Provides frequently asked questions about TOMORROW\'S DAY',

    async execute(message, args, Discord, client) {
        console.log(`Command "${this.name}" executed by ${message.author.tag}`);
        
        const faqEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setDescription(`
                :arrow_right:  **What languages will be supported?**

                The game will feature English voice-overs and text in both English and French :flag_gb: :flag_fr: .

                :arrow_right:  **Will there be a demo?**

                Yes, a demo will be released this winter :snowflake: .

                :arrow_right:  **How long will TOMORROW'S DAY last?**

                We estimate that you'll need more than 5 hours to complete the game!

                :arrow_right:  **Where can I learn more about the game?**

                Make sure to follow us on our social media channels to stay tuned and get the freshest news about the game :globe_with_meridians::
                Twitter: https://twitter.com/splendeed_inc
                Youtube: https://www.youtube.com/channel/UCMIsDg-X0EKKYk4sIjS-wyQ
                Instagram: https://www.instagram.com/splendeed.inc/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D
                Linkedin: https://www.linkedin.com/company/splendeed®/posts/?feedView=all
                Steam: https://store.steampowered.com/app/3134910/TOMORROWS_DAY/
                Official website: https://leomargueritte.squarespace.com/tomorrows-day
            `);

        try {
            await message.channel.send({ embeds: [faqEmbed] });
        } catch (error) {
            console.error('Failed to send the FAQ message:', error);
        }
    },
};
