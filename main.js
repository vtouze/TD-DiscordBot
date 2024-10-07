const { Client, GatewayIntentBits, Partials, Collection, REST, Routes } = require('discord.js');
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
    client.commands.set(command.data ? command.data.name : command.name, command);
}

client.once('ready', async () => {
    console.log('TD-Bot is online!');

    const CLIENT_ID = client.user.id;
    const GUILD_ID = process.env.GUILD_ID;
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    const guild = await client.guilds.fetch(GUILD_ID);

    try {
        const members = await guild.members.fetch();
        console.log(`\nListing all members of the server (${guild.name}):`);

        members.forEach(member => {
            const roles = member.roles.cache.map(role => role.name).join(', ');
            console.log(`${member.user.tag}: [${roles}]`);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }

    const commands = client.commands
        .filter(command => command.data)
        .filter(command => {
            const requiredRole = command.requiredRole;
            if (!requiredRole) return true;
            return guild.roles.cache.some(role => role.name === requiredRole);
        })
        .map(command => command.data.toJSON());

    try {
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Successfully registered application commands based on roles.');
    } catch (error) {
        console.error(error);
    }

    if (fs.existsSync('./reactionRoleMessageID.txt')) {
        const messageID = fs.readFileSync('./reactionRoleMessageID.txt', 'utf-8');
        const channelID = process.env.channelID;
        const channel = await client.channels.fetch(channelID);

        try {
            const message = await channel.messages.fetch(messageID);
            console.log(`Fetched reaction role message with ID: ${messageID}`);

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
                    const member = await reaction.message.guild.members.fetch(user.id);

                    if (reaction.emoji.name === notifierTeamEmoji) {
                        try {
                            await member.roles.add(notifierTeamRole);
                            console.log(`Added role "Notifier" to ${member.user.tag}`);
                        } catch (error) {
                            console.error(`Failed to add role "Notifier" to ${member.user.tag}: ${error}`);
                        }
                    }
                    if (reaction.emoji.name === playTesterTeamEmoji) {
                        try {
                            await member.roles.add(playTesterTeamRole);
                            console.log(`Added role "PlayTester" to ${member.user.tag}`);
                        } catch (error) {
                            console.error(`Failed to add role "PlayTester" to ${member.user.tag}: ${error}`);
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
                    const member = await reaction.message.guild.members.fetch(user.id);

                    if (reaction.emoji.name === notifierTeamEmoji) {
                        try {
                            await member.roles.remove(notifierTeamRole);
                            console.log(`Removed role "Notifier" from ${member.user.tag}`);
                        } catch (error) {
                            console.error(`Failed to remove role "Notifier" from ${member.user.tag}: ${error}`);
                        }
                    }
                    if (reaction.emoji.name === playTesterTeamEmoji) {
                        try {
                            await member.roles.remove(playTesterTeamRole);
                            console.log(`Removed role "PlayTester" from ${member.user.tag}`);
                        } catch (error) {
                            console.error(`Failed to remove role "PlayTester" from ${member.user.tag}: ${error}`);
                        }
                    }
                }
            });

        } catch (error) {
            if (error.code === 10008) {
                console.error(`The message with ID ${messageID} was not found. It may have been deleted.`);
            } else {
                console.error('An error occurred while fetching the message:', error);
            }
        }
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

    if (message.partial) await message.fetch();

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
        
    if (command) {
        try {
            console.log(`${message.author.displayName}: ${commandName}`);
            
            if (!message.deleted) {
                await message.delete();
            } else {
                console.log("Message has already been deleted or is not accessible.");
            }

            await command.execute(message, args, require('discord.js'), client);
        } catch (error) {
            console.error('Error executing the command:', error);
            message.channel.send('There was an error executing that command!');
        }
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command.requiredRole) {
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const hasRole = member.roles.cache.some(role => role.name === command.requiredRole);

        if (!hasRole) {
            return await interaction.reply({ 
                content: `You need the "${command.requiredRole}" role to use this command.`, 
                ephemeral: true 
            });
        }
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});


client.login(process.env.DISCORD_TOKEN);