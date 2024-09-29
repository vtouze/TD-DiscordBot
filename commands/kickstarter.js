module.exports = {
    name: 'kickstarter',
    description: 'Sends the official kickstarter for TOMORROW\'S DAY!',
    execute(message, args){
        message.channel.send('https://www.kickstarter.com/projects/splendeed/tomorrows-day');
    }
}