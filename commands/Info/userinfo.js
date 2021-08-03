const { Client, Message, MessageEmbed } = require('discord.js');
//requiring moment package.
const moment = require("moment")
//All flags
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
module.exports = {
    
    name: 'userinfo',
    aliases: ['ui'],
    usage: '@user',
    timeout: 10000,
    description: 'Shows the information of the user.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { guild, member, channel, mentions } = message
        const user = message.member.user
        const target = mentions.members.first()
        //actual code.
        try {
            //defining few things.
            const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
            const roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
            const userFlags = member.user.flags.toArray();
            //defining userinfo embed
            const embed = new MessageEmbed()
                .setTitle(`**${member.user.username}**'s information`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(member.displayHexColor || '#5c5c5c')
                .addFields(
                    {
                        name: `**Username:**`,
                        value: `${member.user.username}`,
                        inline: true
                    },
                    {
                        name: `**Discriminator:**`,
                        value: `#${member.user.discriminator}`,
                        inline: true
                    },
                    {
                        name: `ID:`,
                        value: `${member.id}`,
                        inline: true
                    },
                    {
                        name: `HypeSquad:`,
                        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                        inline: true
                    },
                    {
                        name: `Status:`,
                        value: `${member.user.presence.status}`,
                        inline: true
                    },
                    {
                        name: `Account created:`,
                        value: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')}, ${moment(member.user.createdTimestamp).fromNow()}`,
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '**Server information**',
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `Server join date:`,
                        value: `${moment(member.joinedAt).format('LL LTS')}`,
                    },
                    {
                        name: `Highest Role:`,
                        value: `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                        inline: true
                    },
                   
                )
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL({ dynamic: true}))
                .setTimestamp()
                    //sending the embed to the channel.
                const sendEmbed = await message.channel.send(embed)
                    //catching the error.
        } catch (err) {
            console.log('uwu I have a fucky err: ' + err)
            message.channel.send('uwu I have a fucky err: ' + err)
        }
  },
};