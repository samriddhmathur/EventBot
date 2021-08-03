const { Client, Message } = require("discord.js");

module.exports = {
    name: 'say',
    description: "Repeats the thing said by a user.",
    run: (client, message, args) => {
        //if there is no argument then it will send this message.
    if(!args[0]) return message.channel.send('What do u want me to say?')
        //if there in an argument mentioned, then it will repeat what the argument was.
        //sending the message to channel.
        message.channel.send(`${args.join(' ')}`)
    }
}