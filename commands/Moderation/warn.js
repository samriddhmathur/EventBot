const db = require('../../models/warns')
const Discord= require('discord.js')
const { Message, MessageEmbed } = require('discord.js')


module.exports = {
    name: 'warn',
    aliases: ['w'],
    timeout: 0.1,
    usage: '@user <reason>',
    description: "Warns a user.",
    /**
     * @param {Message} message
     */
    run : async(client,message,args) => {
        //perms check
        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
            return message.channel.send(embed)
        }

        //defining few things.
    var user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply('You did not mention a user for me to warn!');
     //trying to fetch a user which has MANAGE_MESSAGES perms so that a moderator cannot warn a moderator.
    var member;
    try {
        member = await message.guild.members.fetch(user)
    } catch(err) {
        member = null;
    }
    if (member){
        if(member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You cannot warn a moderator.')
    }
        
        const reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send('Please specify the reason to warn this user!')
        //using db
        db.findOne({ guildid: message.guild.id, user: user.id}, async(err,data) => {
            if(err) throw err;
            
                if(!data) {
                    data = new db({
                        guildid: message.guild.id,
                        user: user.id,
                        content : [
                            {
                                moderator : message.author.id,
                                reason : reason
                            }
                        ]
                    })
                     
                } else {
                    const obj = {
                        moderator: message.author.id,
                        reason : reason
                    }
                    data.content.push(obj)
                }
                //saving the data to db.
                await data.save()
            
        });
        //defining embed which will be send to user after getting warned.
        user.send(new MessageEmbed()
        .setDescription(`You have been warned in ${message.guild.name} for ${reason}`)         
            .setColor("RED")
        )
        //sending the final embed to channel.
        message.channel.send(new MessageEmbed()
            .setDescription(`✅ Warned ${user} for ${reason}`)
            .setColor("GREEN")
        )
    }
}