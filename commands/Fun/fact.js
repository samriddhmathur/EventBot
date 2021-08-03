const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = {
    name: 'fact',
    aliases: ['f'],
    description: 'Displays a random fact.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        //defining few things.
        const { member, channel, mentions } = message
        const user = message.member.user
        //fact using neko.life package.
        try {

            let fact = await neko.sfw.fact()
            //defining embed in twhich the fact will be there.
            const embed = new MessageEmbed()
            .setTitle('Cool Fact:')
            .setDescription(fact.fact)
            .setColor('RANDOM')

            message.channel.send(embed)
//catching the error.
        } catch (err) {
            console.log('Imagine having an error lmfao ' + err)
            message.channel.send('Imagine having an error lmfao : ' + err)
        }
    }

    }
