const { Client, Message, MessageEmbed } = require('discord.js');
const { Random } = require("something-random-on-discord")
const random = Random;
module.exports = {
    name: 'advice',
    aliases: ['ad'],
    description: 'Random advice on discord',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.member.user
        //using the data from something random on discord package.
        try {

            let data = await random.getAdvice()
           message.channel.send(data)
        
            //catching the error.
        } catch (err) {
            console.log('Imagine having an error lmfao' + err)
            message.channel.send('Imagine having an error lmfao ' + err)
        }
    }
}