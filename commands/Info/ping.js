const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    usage: '',
    description: 'Checks the ping of the bot.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        //sending the ping to the channel.
        message.channel.send(`The current ws ping is \`${client.ws.ping}ms\`` )
    }
}