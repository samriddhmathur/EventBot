const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'lock',
    description: "Locks a perticular channel.",
    usage: '#channel RoleID <reason>',
    run: async(client,message,args) => {

        //checking perms
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_CHANNELS\` permission to run this command.')
            return message.channel.send(embed)
        }
        //defining few things.
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Please specify a channel name')
        const roletofind = args[1]
        const role = message.guild.roles.cache.find(r => r.id === roletofind)
        if(!role) return message.reply('Please specify a valid role id!')
        console.log(role)
        const reason = args.slice(2).join(" ") || 'No reason given'
        //defining embed which will be sent to locked channel.
        let embed = new MessageEmbed()
        .setTitle('This channel is locked down.')
        .addField('Locked by:', `${message.author.tag}`)
        .addField('Reason:', `${reason}`)
        .setTimestamp()
        .setColor("RED")
        //changing channel overwrites.
        channel.updateOverwrite(role, {
            SEND_MESSAGES: false
        })
        //sending the embed to locked channel.
        await channel.send(embed)
    }
}