const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const prefix = '-';
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('TD-Bot is online!');

    // If the reaction role message ID exists, fetch it and attach event listeners
    if (fs.existsSync('./reactionRoleMessageID.txt')) {
        const messageID = fs.readFileSync('./reactionRoleMessageID.txt', 'utf-8');
        const channelID = '1287870926200901642';
        const channel = await client.channels.fetch(channelID);
        const message = await channel.messages.fetch(messageID);

        console.log(`Fetched reaction role message with ID: ${messageID}`);

        // Attach listeners for reactions (messageReactionAdd and messageReactionRemove)
        const notifierTeamRole = message.guild.roles.cache.find(role => role.name === "Notifier");
        const playTesterTeamRole = message.guild.roles.cache.find(role => role.name === "PlayTester");

        const notifierTeamEmoji = '🔔';
        const playTesterTeamEmoji = '🎮';

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === notifierTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === playTesterTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.add(playTesterTeamRole);
                    }
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channelID) {
                if (reaction.emoji.name === notifierTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(notifierTeamRole);
                    }
                }
                if (reaction.emoji.name === playTesterTeamEmoji) {
                    const member = reaction.message.guild.members.cache.get(user.id);
                    if (member) {
                        await member.roles.remove(playTesterTeamRole);
                    }
                }
            }
        });
    }
});

client.on('guildMemberAdd', async guildMember => {
    console.log('A new member has joined:', guildMember.user.tag);

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

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
        
    if (command) {
        try {
            console.log(`${message.author.displayName}: ${commandName}`);

            await message.delete();

            await command.execute(message, args, require('discord.js'), client);
        } catch (error) {
            console.error('Error executing the command:', error);
            message.channel.send('There was an error executing that command!');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);