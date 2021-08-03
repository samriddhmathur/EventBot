const Discord = require('discord.js')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'snipe',
    description: "Shows the recently deleted message.",

    run: async(client, message, args) => {
    let snip = client.snipe.get(message.channel.id)
    //perms check
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
            return message.channel.send(embed)
    }
    //if there is no deleted message then it will send this message.
    if(!snip) return message.channel.send(':x: Not Found!')
    //defining embed in which the deleted message will be there.
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(snip.user,snip.profilePhoto)
    .setDescription(`**Message:** ${snip.msg}`)
    if(snip.image) embed.setImage(snip.image)
    //sending embed to channel.
    message.channel.send(embed)
    }
}