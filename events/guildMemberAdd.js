//requiring few things.
const client = require('../index');
const Schema = require('./../models/mute');
//guildmemberadd event
client.on('guildMemberAdd', async(member) => {
    console.log(1);
    const data = await Schema.findOne({ Guild: member.guild.id });
    console.log(2);
    if(!data) return;
     console.log(data)
    if(data.Users.includes(member.id)){
        //adding the mute role to the user after they rejoins.
 const role = member.guild.roles.cache.find((role) => role.name === 'Muted');
 await member.roles.add(role);
console.log(4)
}
})