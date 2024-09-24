const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');

// Create the client and set intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions  // Added intent to handle reactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const prefix = '-';
client.commands = new Collection();

// Read all command files from the `commands` folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('TD-Bot is online!');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Find the command and execute it
    const command = client.commands.get(commandName);

    if (command) {
        try {
            command.execute(message, args, require('discord.js'), client);  // Passing `Discord` here
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command!');
        }
    }
});

client.login('MTI4NjQxNzc1NTAwODEzOTI4NQ.GjvLhs.r6R_68gsTEuIlaChOLcgZt--Iq5o_mKCJrmcd8');