const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'faq1',
    description: 'Provides information about TOMORROW\'S DAY',

    async execute(message, args, Discord, client) {
        console.log(`Command "${this.name}" executed by ${message.author.tag}`);
        
        const aboutEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setDescription(`
                :arrow_right:  **What is TOMORROW'S DAY?**

                TOMORROW'S DAY is a point & click investigative game set in Dallas, Texas, in 1999, where the spread of communism threatens the nation's security. As a Dallas homeland security agent, you're tasked with monitoring citizens through a sophisticated network of cameras and collecting incriminating evidence for the government.

                As James Steel, you'll be drawn into a world of moral dilemmas, where every decision - to turn suspects in or let them go - is fraught with consequences. The further you go, the more you'll question the truth behind the regime you serve.

                :arrow_right:  **Who are we?** 

                Founded by Léo Margueritte, SPLENDEED is a production company with a three-dimensional approach. Our mission is to redefine how stories are told, music is created, and video games are developed, bringing our unique vision to the public.

                MOVIES®: Producing films that defy convention, combining bold storytelling with a retro aesthetic.

                STUDIOS®: Creating music that transcends genres, whether through albums, soundtracks, or immersive sound experiences.

                GAMES®: Developing playful experiences that blend immersive gameplay and rich narratives.

                At SPLENDEED, we believe in collaboration and innovation to create work that inspires, entertains, and engages. Our team of talent from all areas of entertainment is dedicated to pushing creative boundaries while honoring our commitment to excellence.

                :arrow_right:  **Who is the protagonist of TOMORROW'S DAY?**

                You are James Steel, a newly appointed agent of Dallas' Internal Security. Tasked with protecting the United States, he must combat the spread of communism infiltrating the streets and threatening the nation's institutions.

                :arrow_right:  **On which platforms will the game be available?**

                TOMORROW'S DAY will be available exclusively on PC :desktop: .

                :arrow_right:  **When will it be released?**

                TOMORROW'S DAY will be released in late 2025.
            `);

        try {
            await message.channel.send({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('Failed to send the about message:', error);
        }
    },
};
