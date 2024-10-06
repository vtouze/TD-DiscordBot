const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Sends the TOMORROW\'S DAY welcome message and channel overview',

    async execute(message, args, Discord, client) {
        console.log(`Command "${this.name}" executed by ${message.author.tag}`);        
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setDescription(`
                **:wave: WELCOME**

                **#welcome** - initial information about the server and social media links.
                **#📖server-rules** - the list of server rules you should follow for best communications.
                **#📚server-roles** - the list of all available roles on the server.
                **#❔faq** - info about TOMORROW'S DAY.

                **⭐ ANNOUNCEMENTS & INFORMATION**

                **#📢announcements** - official news about TOMORROW'S DAY and Splendeed studio.
                **#🔔server-updates** - info about changes, updates, and activities on the server.
                **#🌐social-media** - all posts from our official social media in one place.

                **:flag_us: TOMORROW'S DAY DISCUSSION** 

                **#general** - a general chat to talk about TOMORROW'S DAY and more.
                **#🧠lore** - discuss the lore, gameplay, and spoilers of TOMORROW'S DAY.
                **#🎨art** - official wallpapers, icons, and dev art.
                **#🎵music** - all about game soundtracks and audio.
                **#🤯off-topic** - a chat to talk about anything you would like, within server rules.

                **:woman_raising_hand: Q&A**

                **#❔question-suggestion** - your questions to the team for our Live Q&As.
                **#❓question-voting** - the best questions are selected for answers during Live Q&A here.
                **#📋testing-instructions** - guidelines and steps for testing sessions.
                **#📆qa-planning** - upcoming QA sessions and schedules.

                **👾 BUG REPORTS**

                **#create-bug-report** - here you can create a bug report form that will go directly to the QA team.

                **👮 Patriots**

                **#👋introductions** - say hi and introduce yourself to the community!
                **#🍔meet-the-team** - get to know our developers and their roles.
            `);

        try {
            console.log('Embed description length:', welcomeEmbed.data.description.length);
            await message.channel.send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.error('Failed to send the welcome message:', error);
        }
    },
};