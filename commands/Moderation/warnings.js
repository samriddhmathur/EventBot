const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warnings',
    aliases: ['infractions', 'warns'],
    usage: '@user',
    timeout: 10000,
    description: "Displays the current warns of a user.",
    /**
     * @param {Message} message
     */
    run : async(client,message,args) => {
        //checking perms
        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
            return message.channel.send(embed)
        }
        //defining few things
        const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
        if(!user) return message.reply('Please mention a user to warn!')
        //using db
        await db.findOne({ guildid: message.guild.id, user: user.id}, async(err,data) => {
            if(err) throw err;
            //if there is a warn data it will send this embed.
            if(data) {
                //sending the warnings embed.
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warnings `)
                    .setDescription(
                        data.content.map(
                            (w ,i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {
                //if there is no data it will send this message.
                message.channel.send('User has No warnings. Good keep it up!')
            }
            
               
        })
        
    }
}