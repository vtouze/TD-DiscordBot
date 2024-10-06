const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'rules',
    description: 'Sends the TOMORROW\'S DAY server rules',

    async execute(message, args, Discord, client) {
        const rulesEmbed = new EmbedBuilder()
            .setColor('#96170e')
            .setDescription(`
                :no_entry_sign: **1. No discussion of politics or religion.**
                We have more interesting topics to discuss.

                :no_entry_sign: **2. No direct insults to members of the server.**
                Respect your patriots!

                :no_entry_sign: **3. No racism, harassment, and discrimination in any form.**
                We are all equal here.

                :no_entry_sign: **4. No spam: numerous similar or meaningless messages, emoji, gifs from one person.**
                We don't mind having fun, but we do mind trolling.

                :no_entry_sign: **5. No NSFW content allowed.**
                However, swearing is acceptable as long as it doesn't contradict the 2nd and 3rd rules.

                :no_entry_sign: **6. No alt accounts.**
                Be yourself.

                :no_entry_sign: **7. Don't ping the @Splendeed Team**
                Don't distract people from their work.
                ⚠ For server, game, and moderation-related questions, ping @teez2109 or contact him through DMs.

                :no_entry_sign: **8. No Impersonation.**
                Do not impersonate other members, especially moderators or admins.

                :no_entry_sign: **9. No Advertisement.**
                While we appreciate enthusiasm, this is not the place for promoting external websites, products, or services.
                Keep the focus on the game and community.

                :white_check_mark: **10. Keep your use of channels in line with the theme.**
                Channel descriptions can be found here: #🔍server-channels  

                :warning: **11. If you find yourself in a discomfort situation on the server, don't hesitate to ping @Moderators.**
                They will definitely help you and resolve the problem.

                :warning: **12. Speak only in English in the channels.**
                If other languages are heavily represented, we can add language-specific channels later.

                :hammer: **13. For violation of the server rules, moderators can apply several types of penalties:**

                **Warning** - primary violation.
                **Mute 24 hours** - repeated violation.
                **Permanent ban** - the third and final punishment.
                Moderators have the discretion to take actions on behavior that, while not explicitly listed in the server rules, is deemed harmful or disruptive to the community.
            `);

        try {
            await message.channel.send({ embeds: [rulesEmbed] });
        } catch (error) {
            console.error('Failed to send the rules message:', error);
        }
    },
};
