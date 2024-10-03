const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accept-suggestion')
        .setDescription('Accept a suggestion by providing the message ID and a reason.')
        .addStringOption(option => 
            option.setName('messageid')
                .setDescription('The ID of the suggestion message')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for accepting the suggestion')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ManageMessages')) {
            return interaction.reply({ content: 'You do not have permission to manage messages.', ephemeral: true });
        }

        const messageID = interaction.options.getString('messageid');
        const acceptQuery = interaction.options.getString('reason');

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

            const acceptEmbed = new EmbedBuilder()
                .setAuthor({ name: embedData.author.name, iconURL: embedData.author.iconURL })
                .setDescription(embedData.description)
                .setColor('#00FF00')
                .addFields({ name: 'Status', value: `ACCEPTED: ${acceptQuery}`, inline: false });

            await suggestedMessage.edit({ embeds: [acceptEmbed] });

            const user = interaction.client.users.cache.find(u => u.tag === embedData.author.name);
            if (user) {
                await user.send(`Your suggestion has been accepted by a moderator!\nHere is your suggestion: "${suggestionQuery}"`);
            }

            await interaction.reply({ content: 'Suggestion accepted and user notified.', ephemeral: true });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while accepting the suggestion or that suggestion does not exist.', ephemeral: true });
        }
    },
};