const Discord = require("discord.js");
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: ['b'],
    usage: '@user <reason>',
    description: "Bans a user from this server.",

    run: async(client, message, args) => {
        //cheching the user permission.
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You need \`BAN_MEMBERS\` permission to run this command.')
        return message.channel.send(embed)
    }
    //defining few things
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply('You did not mention a user for me to ban!');
    //trying to fetch a user which has MANAGE_MESSAGES perms so that a moderator cannot ban a moderator.
    var member;
    try {
        member = await message.guild.members.fetch(user)
    } catch(err) {
        member = null;
    }
    if (member){
        if(member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot ban a moderator')
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return message.reply('You must specify a reason!')
    //defining embed which will be sent to user after getting banned.
    var userLog = new Discord.MessageEmbed()
    .setColor('0x42f54b')
    .setDescription(`You have been banned from ${message.guild.name} for reason: **${reason}**`)
    
    
    //sending the embed to user.
    try {
        await user.send(userLog);
    } catch(err) {
        console.warn(err);
    }
    //banning the user.
    user.ban( {reason})
    //defining embed which will be send to the channel after user gets banned.
    var confir = new Discord.MessageEmbed()
    .setTitle('User Banned')
    .setColor('RED')
    .setDescription(`${user} has been successfully **banned**.`)
    .addField('Reason:', `${reason}`)
    //sending the embed to user.
    message.channel.send(confir);
    
    }
}