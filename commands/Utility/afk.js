const { Collection } = require('discord.js');
const { afk } = require('../../Collection');
module.exports = {
    name: 'afk',
    usage: '<reason>',
    timeout: 0.1,
    description: "Sets user to afk.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const reason = args.join(" ") || 'AFK';
        //setting user to afk.
        afk.set(message.author.id, [Date.now(), reason]);
//sending the message to channel that the user is now afk.
        message.reply(`You are now AFK: ${reason}`);

    },
};