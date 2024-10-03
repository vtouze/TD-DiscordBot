const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Submit a suggestion.')
        .addStringOption(option => 
            option.setName('suggestion')
                .setDescription('Your suggestion')
                .setRequired(true)
        ),

    requiredRole: 'Patriots',

    async execute(interaction) {
        const suggestionQuery = interaction.options.getString('suggestion');

        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(`**Suggestion**: ${suggestionQuery}`)
            .setColor('#f5a142')
            .setTimestamp()
            .addFields({ name: 'Status', value: 'PENDING' });

        try {
            await interaction.reply('Your suggestion has been submitted!');

            const suggestionChannel = interaction.guild.channels.cache.get('1280146231334535332');
            if (suggestionChannel) {
                await suggestionChannel.send({ embeds: [embed] });
            } else {
                console.error('Suggestion channel not found.');
                await interaction.followUp({ content: 'Failed to find the suggestion channel.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error in suggestion command:', error);
            if (!interaction.replied) {
                await interaction.reply({ content: 'There was an error processing your suggestion.', ephemeral: true });
            }
        }
    }
};