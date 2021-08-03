const Discord = require("discord.js");
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'kick',
    aliases: ['k'],
    usage: '@user <reason>',
    description: "Kicks a user from this server.",

    run: async(client, message, args) => {

        //checking perms
    if(!message.member.hasPermission('KICK_MEMBERS')) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You need \`KICK_MEMBERS\` permission to run this command.')
        return message.channel.send(embed)        
    }
//defining few things.
    var user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply('You did not mention a user for me to Kick!');
    //trying to fetch a user which has MANAGE_MESSAGES perms so that a moderator cannot kick a moderator.
    var member;
    try {
        member = await message.guild.members.fetch(user)
    } catch(err) {
        member = null;
    }
    if (member){
        if(member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot Kick a moderator')
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return message.reply('You must specify a reason!')
    //defining embed which will be sent to user after getting kicked.
    var userLog = new Discord.MessageEmbed()
    .setColor('0x42f54b')
    .setDescription(`You have been Kicked from ${message.guild.name} for reason: **${reason}**`)
    
    
    //sending the embed to the user.
    try {
        await user.send(userLog);
    } catch(err) {
        console.warn(err);
    }
    //kicking the member.
    member.kick(reason)
    //defining the embed which will be send to the channel
    var confir = new Discord.MessageEmbed()
    .setTitle('User Kicked')
    .setColor('RED')
    .setDescription(`${user} has been successfully **Kicked**.`)
    .addField('Reason:', `${reason}`)
    //sending the embed to channel
    message.channel.send(confir);
    
    }
}