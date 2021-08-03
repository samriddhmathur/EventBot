const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['purge', 'sweep'],
    usage: '<ammount of messages>',
    description: "Bulk deletes messages.",
    run: async(client, message, args) => {
        //checking perms.
        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('You need \`MANAGE_MESSAGES\` permission to run this command.')
            return message.channel.send(embed)
        }
        //if there is no argument specified then it will return.
        if(!args[0]) return message.channel.send('Please specify an ammount of messages to delete (1-99)')
        //checking if the argument is a number or not.
        if(isNaN(args[0])) return message.channel.send('Only numbers are allowed.')
        //checking the length of the argument. If the length is greater than 99 then it will return.
        if(parseInt(args[0]) > 99) return message.channel.send('Max ammount of messages that can be cleared is 99')
             //bulkdeleting messages.
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
            //catching the error.
                .catch(err => console.log(err))
                //sending the final thing to the channel
            message.channel.send(` ✅ Successfully deleted \`${args[0]} messages!\``).then(m => m.delete({timeout : 5000}))
    }
}