const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    description: 'Shows the information about the server.',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client , message , args) =>{
        const guild = message.guild;
        //defining embed and creating embed.
        const embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("RANDOM")
            .addField('General Info', [
                `ID: ${guild.id}`,
                `Name: ${guild.name}`,
                `Owner: ${guild.owner}`
            ])
            //Counting of roles, text channels, emojis and voice channels.
            .addField('Counts', [
                `Role: ${guild.roles.cache.size} roles`,
                `Channels: ${guild.channels.cache.filter ((ch) => ch.type === 'text' || ch.type === 'voice' )
                .size
            } total (Text: ${
                    guild.channels.cache.filter((ch) => ch.type === 'text').size
               }, Voice: ${guild.channels.cache.filter((ch) => ch.type === 'voice')
                    
                    .size
                })`,
                    `Emojis: ${guild.emojis.cache.size} (Regular: ${
                        guild.emojis.cache.filter((e) => !e.animated).size
                    }, Animated: ${
                        guild.emojis.cache.filter((e) => e.animated).size
                    })`
            ])
            //additional information of the server : Date of server created, server region and boost count with boost tiers.
            .addField("Additional Information", [
                `Created: ${moment(guild.createdTimestamp).format(
                    "LT"
                    )}  ${moment(guild.createdTimestamp).format("LL")} ${moment(
                        guild.createdTimestamp
                        ).fromNow()}`,
                        `Region: ${guild.region}`,
                        `Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}`: 'None'
                    }`,
                    `Boost Count: ${guild.premiumSubscriptionCount || "0"}`,
            ]);
            //sending the embed to the channel.
            message.channel.send({ embed });
        
            
        
    },
};