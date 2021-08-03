const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    usage: '<time>',
    description: 'Changes slowmode of a channel.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        //checking perms.
        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_CHANNELS\` permission to run this command.')
            return message.channel.send(embed)
        }
        
        //defining few things.
        var time = args[0]
        if(!time) return message.channel.send(`The current slowmode is **${message.channel.rateLimitPerUser}** seconds.`)
        //cheking is the argument is a number or not.
        if(isNaN(args[0])) return message.reply('you need to specify a valid number to set slowmode to!');
        //checking the size of the argument
        if(args[0] < 0) return message.reply('you need to specify a positive number for me to set the slowmode to!');
        if (args[0] > 21600) return message.reply('you need to specify a time that is less than 6h (21,600 seconds)');
        //setting the slowmode.
        message.channel.setRateLimitPerUser(time)
        //sending the final thing to channel.
       message.channel.send(`Set slowmode to **${time}** seconds!`);
    } 
}