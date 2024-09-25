const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Create the client and set intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers // Ensure this is included
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

client.on('guildMemberAdd', async guildMember => {
    console.log('A new member has joined:', guildMember.user.tag); // Log to confirm event triggers

    console.log(guildMember.guild.roles.cache.map(role => role.name)); // Log all role names in the server
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Patriots');

    if (!welcomeRole) {
        console.error('Role "Patriots" not found!');
        return;
    }

    try {
        await guildMember.roles.add(welcomeRole);
        console.log(`Assigned role "Patriots" to ${guildMember.user.tag}`);
    } catch (error) {
        console.error(`Failed to assign role: ${error}`);
    }
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
        try {
            command.execute(message, args, require('discord.js'), client);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command!');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);