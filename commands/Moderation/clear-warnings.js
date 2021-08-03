//requiring database which we created in models folder.
const db = require('../../models/warns')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name : 'clear-warnings',
    aliases: ['clearwarns'],
    usage: '@user',
    description: "Clears all warnings of a user.",
    run : async(client, message, args) => {
        //checking perms.
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`ADMINISTRATOR\` permission to run this command.')
            return message.channel.send(embed)
        }
        //defining few things.
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Please mention a user that you want to delete the warnings of.')
        //using db
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            //checking if user has any warn data.
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Cleared ${user.user.tag}'s warns`)
                //if user has no warn data then it will send that user has no warns.
            } else {
                message.channel.send('Look like this user has a clean data and has no warns!')
            }
        })
    }
}