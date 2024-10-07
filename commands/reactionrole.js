const fs = require('fs');

module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message',
    requiredRole: 'Splendeed Team',
    async execute(message, args, Discord, client) {
        const channelID = process.env.channelID;
        const notifierTeamRole = message.guild.roles.cache.find(role => role.name === "Notifier");
        const playTesterTeamRole = message.guild.roles.cache.find(role => role.name === "PlayTester");

        const notifierTeamEmoji = '🔔';
        const playTesterTeamEmoji = '🎮';
        const splendeedStudioEmoji = '<:splendeed_studio:1286022162842390599>';

        const embed = new Discord.EmbedBuilder()
            .setColor('#96170e')
            .setDescription(`${splendeedStudioEmoji} @Splendeed Team 
            Official employees of the studio \n\n

            :shield: @Moderators 
            Volunteer community managing the Discord to keep the peace.\n\n

            :video_game: @PlayTester 
            Helps test the game and provide feedback during playtest sessions.\n\n

            :bell: @Notifier 
            Stays updated on all major server and game news.\n\n

            :flag_us: @Patriots 
            All members of the community.`);

        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(notifierTeamEmoji);
        messageEmbed.react(playTesterTeamEmoji);

        fs.writeFileSync('./reactionRoleMessageID.txt', messageEmbed.id, 'utf-8');

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === notifierTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === playTesterTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(playTesterTeamRole);
                    }
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === notifierTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === playTesterTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(playTesterTeamRole);
                    }
                }
            }
        });
    }
};