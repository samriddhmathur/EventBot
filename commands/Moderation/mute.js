const Discord = require("discord.js");
const Schema = require('../../models/mute')
const ms = require('ms');
const { Client, Message, MessageEmbed } = require('discord.js');
 
module.exports = {
    name: 'mute', 
    aliases: ['m'],
    usage: '@user <time>',
    description: "Mutes a user permanently or temporarily",

    run: async(client, message, args) => { 
    //perms check
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
        return message.channel.send(embed)
    }
    //defining few things
 
    var target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.reply('You need to mention a user for me to mute them!')
 
     
    var muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); 
 
    var targetID = message.guild.members.cache.get(target.id)
 
    if(!args[1]) {
        //adding the muterole to the user if there is no argument mentioned.
        targetID.roles.add(muteRole)
       //defining the hardmute embed which will be sent to channel
        var confirmation = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`✅ <@${targetID.user.id}> has been succesfully muted by ${message.author} until you unmute them using the \`unmute\` command!`)
        //sending the embed to the channel.
        message.channel.send(confirmation);
        //defining the hardmute embed which will be send to user.
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been hard muted in ${message.guild.name}!`)
        try {
            await target.send(userLog);
        } catch(err) {
            console.warn(err);
        };
 
  
//database.
    const find = await Schema.findOne({ Guild: message.guild.id })
    if(!find){
           const Create =  await Schema.create({
                Guild: message.guild.id,
                Users: targetID.id,
            });
            await Create.save()
        } else {

            await find.Users.push(targetID.id);
            await find.save();
        }
 
    
        return
    };
    
    targetID.roles.add(muteRole);
    
      
    const find = await Schema.findOne({ Guild: message.guild.id })
    if(!find){
           const Create =  await Schema.create({
                Guild: message.guild.id,
                Users: targetID.id,
            });
            await Create.save()
        } else {
            console.log('MUTED USER')
            await find.Users.push(targetID.id);
            await find.save();
        }
  
    //sending the tempmute final message to the channel.
    var confirmation = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(` ✅ <@${targetID.user.id}> has been succesfully muted by ${message.author} for ${ms(ms(args[1]))}.`)
    message.channel.send(confirmation);
 
    const member = message.mentions.users.first() || message.client.users.cache.get(args[0]) ;
        //defining embed which will be sent to user after getting tempmuted.
    var userLog2 = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setTitle(`You have been muted in ${message.guild.name}!`)
    .addField('Expires in:' , ms(ms(args[1])))
 //sending the tempmute embed to the user.
    try {
        await target.send(userLog2);
    } catch(err) {
        console.warn(err);
    }
 
    setTimeout(function () {
    
        targetID.roles.remove(muteRole);
        
         Schema.findOne({ Guild: message.guild.id }, async(err,data) => {
         if(data){
         data.Users = [];
         await data.save();
         }
    });
        
    } , ms(args[1]));
  
    }
}