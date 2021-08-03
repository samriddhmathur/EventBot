//requiring few things.
const Discord = require('discord.js');
const config  = require('./config.json')
const prefix = config.prefix;
const token = config.token;
const client = new Discord.Client;
const Fs = require('fs')
//exporting client.
module.exports = client;

//ready event
client.on('ready', async() => {
    console.log('I am ready');
    client.user.setActivity('$help')
})
//conecting to mongodb
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected to mongo DB'))
//requiring the command handler from index.js to handlers directory.
const { Collection } = require('discord.js')

client.commands = new Collection();
client.aliases = new Collection();
client.categories = Fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//message event of the bot
client.on('message', async (message) => {
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if(cmd.length == 0 ) return;
        let command = client.commands.get(cmd)
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if(command) command.run(client, message, args)
})
//defining snipe.
client.snipe = new Map()
//message delete event.
client.on("messageDelete", async(message,channel) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg:message.content,
        user:message.author.tag,
        profilePhoto: message.author.displayAvatarURL(),
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
    })
});

//logging in the bot.
client.login(process.env.token)