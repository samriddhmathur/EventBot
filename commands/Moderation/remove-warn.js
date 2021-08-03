const db = require('../../models/warns')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name : 'remove-warn',
    aliases: ['removewarn'],
    timeout: 0.1,
    usage: '@user <Warn number to be removed>',
    description: "Removes one warning of a user at a time.",
    run : async(client, message, args) => {
        //perms check
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`ADMINISTRATOR\` permission to run this command.')
            return message.channel.send(embed)
        }
        //defining few things.
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Please mention a user that you want to delete a warn of.')
        //using db
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                //sending final message.
                message.channel.send('Deleted the warn you mentioned.')
                //saving database.
                data.save()
            } else {
                //if there is no data then it will send this message.
                message.channel.send('Look like this user has a clean data and has no warns!')
            }
        })
    }
}