const { afk } = require('../Collection');
const client = require('../index');
const moment = require('moment');
//message event
client.on('message', async(message) => {
    //checking if the user is afk in the guild or not and checking if the the author is bot or not.
    if(!message.guild || message.author.bot) return;
//defining few things.
    const mentionedMember = message.mentions.members.first();
    if(mentionedMember) {
        const data = afk.get(mentionedMember.id);
        //if there is afk data then then it will show that the user is currently afk.
        if(data) {
            const [ timestamp, reason ] = data;
            const timeAgo = moment(timestamp).fromNow();

            message.reply(
                `${mentionedMember.user.username} is currently AFK: ${reason} - ${timeAgo}`
            );
        }
    }
//if the user sends a message then it will delete the afk data.
    const getData = afk.get(message.author.id);
    if(getData) {
        afk.delete(message.author.id);
        message.channel.send(`Welcome back ${message.member}, I have removed your AFK!`).then(m => m.delete({timeout : 5000}))
    }
    console.log(mentionedMember)
});