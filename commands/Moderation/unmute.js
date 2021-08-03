const Discord = require("discord.js");
const Schema = require('../../models/mute')
const ms = require('ms');

module.exports = {
    name: 'unmute',
    aliases: ['u'],
    usage: '@user',
    description: "Unmutes a perticular user",

    run: async(client, msg, args) => {
        //perms check.
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
        return message.channel.send(embed)
    }
    //defining few things. 
    var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!target) return msg.reply('You need to mention a user for me to unmute them!')
    var targetID = msg.guild.members.cache.get(target.id)

    
    var muteRole = msg.guild.roles.cache.find(role => role.name === 'Muted');
    //using database.
    Schema.findOne({
        Guild: msg.guild.id
    }, async(err, data) =>{
        console.log(data)
        //if the person has no mute data, then this message will be sent.
        if(!data) return msg.reply('Member was not muted.');
        if(data.Users.includes(targetID.id)) {
        data.Users.splice(targetID.id, 1);
        //saving the data.
        data.save();
        //removing the mute role.
        targetID.roles.remove(muteRole)
        //making an embed which will be sent to channel after person is unmuted.
        var confirmation = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`<@${targetID.user.id}> has been succesfully unmuted by ${msg.author}`)
        //sending the embed.
        msg.channel.send(confirmation);
} else return msg.reply('Member is not Muted.');
     }
    );

    }
}