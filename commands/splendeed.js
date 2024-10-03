const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('splendeed')
        .setDescription('Sends the official social media links of Splendeed'),

    requiredRole: 'Patriots',

    async execute(interaction) {
        const requiredRole = interaction.guild.roles.cache.find(role => role.name === 'Patriots');
        if (!interaction.member.roles.cache.has(requiredRole.id)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#F23838')
            .setTitle('Splendeed\'s Social Media')
            .setDescription(`[YouTube](https://www.youtube.com/channel/UCMIsDg-X0EKKYk4sIjS-wyQ)\n
            [Twitter](https://twitter.com/splendeed_inc)\n
            [Instagram](https://www.instagram.com/splendeed.inc/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D)\n
            [Linkedin](https://www.linkedin.com/company/splendeed%C2%AE/posts/?feedView=all)\n
            [Steam](https://store.steampowered.com/app/3134910/TOMORROWS_DAY/?)\n
            [Splendeed Studio official website](https://leomargueritte.squarespace.com/tomorrows-day)\n`)
            .setFooter({ text: 'Follow Splendeed Studio on social media!' });

        await interaction.reply({ embeds: [embed] });
    }
};
