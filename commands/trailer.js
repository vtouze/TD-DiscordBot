module.exports = {
    name: 'trailer',
    description: 'Sends latest TOMORROW\'S DAY trailer!',
    execute(message, args){
        message.channel.send('https://www.youtube.com/watch?v=lJy-ZLZyu2Q&t=37s');
    }
}