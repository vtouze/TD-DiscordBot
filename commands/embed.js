module.exports = {
    name: 'embed',
    description: 'Embed!',
    execute(message, args, Discord) {
        const newEmbed = new Discord.EmbedBuilder()
            .setColor('#F23838')
            .setTitle('Website')
            .setURL('https://www.leomargueritte.fr/splendeed')
            .setDescription('Official website of Splendeed Studio')
            .addFields(
                { name: 'A', value: 'A' },
                { name: 'B', value: 'B' },
                { name: 'C', value: 'C' }
            )
            .setImage('https://i.kickstarter.com/assets/045/849/881/079ae91f6436ae818ce8e49d9430f395_original.png?origin=ugc&q=80&width=600&sig=VnCyRxFdFuX9uaO99xD6eq8IEk92yzgjVyHgCFn2H%2FE%3D')
            .setFooter({ text: 'AAAAAHHHHHHHHHHHH' });

        message.channel.send({ embeds: [newEmbed] }); // Note: Embeds are sent as an array in v14
    }
};