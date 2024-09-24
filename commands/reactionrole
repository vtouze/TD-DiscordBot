module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message',
    async execute(message, args, Discord, client) {
        const channelID = '1287870926200901642';  // Make sure this is your actual channel ID
        const notifierTeamRole = message.guild.roles.cache.find(role => role.name === "Notifier");
        const playTesterTeamRole = message.guild.roles.cache.find(role => role.name === "PlayTester");

        const notifierTeamEmoji = '🔔';  // Use actual emoji characters
        const playTesterTeamEmoji = '🎮';

        // Creating an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('#F23838')
            .setTitle('Role Selection')
            .setDescription(`React to get a role:\n\n${notifierTeamEmoji} Notifier\n${playTesterTeamEmoji} PlayTester`);

        // Sending the embed
        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(notifierTeamEmoji);
        messageEmbed.react(playTesterTeamEmoji);

        // Event for adding a reaction
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === '🔔') {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === '🎮') {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(playTesterTeamRole);
                    }
                }
            }
        });

        // Event for removing a reaction
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === '🔔') {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === '🎮') {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(playTesterTeamRole);
                    }
                }
            }
        });
    }
};