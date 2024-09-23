const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,  // To receive messages in the guild
        GatewayIntentBits.MessageContent  // To read message content (if needed)
    ],
    partials: [Partials.Channel]
});

const prefix = '-';

client.once('ready', () => {
    console.log('TD-Bot is online!');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('pong!');
    }else if (command == 'splendeed'){
        message.channel.send('https://www.leomargueritte.fr/splendeed');
    }
});

client.login('MTI4NjQxNzc1NTAwODEzOTI4NQ.GjvLhs.r6R_68gsTEuIlaChOLcgZt--Iq5o_mKCJrmcd8');
