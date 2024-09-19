const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

client.once('ready', () => {
    console.log('TD-Bot is online!');
});

client.login('MTI4NjQxNzc1NTAwODEzOTI4NQ.GjvLhs.r6R_68gsTEuIlaChOLcgZt--Iq5o_mKCJrmcd8');
