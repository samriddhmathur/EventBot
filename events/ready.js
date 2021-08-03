//ready event for checking if event handler is working or not.

const client = require('../index');

client.on('ready', async() => {
    console.log('Event handler is working mhm.')
})