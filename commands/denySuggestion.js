const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deny-suggestion')
        .setDescription('Deny a suggestion by providing the message ID and a reason.')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('The ID of the suggestion message')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for denying the suggestion')
                .setRequired(true)
        ),

    requiredRole: 'Splendeed Team',
    
    async execute(interaction) {
        if (!interaction.member.permissions.has('ManageMessages')) {
            return interaction.reply({ content: 'You do not have permission to manage messages.', ephemeral: true });
        }

        const messageID = interaction.options.getString('messageid');
        const denyQuery = interaction.options.getString('reason');

        try {
            const suggestionChannel = interaction.guild.channels.cache.get('1280146231334535332');
            if (!suggestionChannel) {
                return interaction.reply({ content: 'Suggestion channel not found.', ephemeral: true });
            }

            const suggestedMessage = await suggestionChannel.messages.fetch(messageID);
            const embedData = suggestedMessage.embeds[0];

            if (!embedData) {
                return interaction.reply({ content: 'The suggestion message does not contain an embed.', ephemeral: true });
            }

            const suggestionQuery = embedData.description.split('**Suggestion**: ')[1];

            const denyEmbed = new EmbedBuilder()
                .setAuthor({ name: embedData.author.name, iconURL: embedData.author.iconURL })
                .setDescription(embedData.description)
                .setColor('#d9372b')
                .addFields({ name: 'Status', value: `DENIED: ${denyQuery}`, inline: false });

            await suggestedMessage.edit({ embeds: [denyEmbed] });

            const user = interaction.client.users.cache.find(u => u.tag === embedData.author.name);
            if (user) {
                await user.send(`Your suggestion has been denied by a moderator!\n Suggest: ${suggestionQuery} \n Reason: ${denyQuery}`);
            }

            await interaction.reply({ content: 'Suggestion denied and user notified.', ephemeral: true });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while denying the suggestion or that suggestion does not exist.', ephemeral: true });
        }
    },
};