const { Client } = require("revolt.js");
require('dotenv').config()

let client = new Client();
let messages = []

client.on("ready", async () =>
    console.info(`Logged in as ${client.user.username}!`),
);

client.on("message", async (message) => {
    messages.push(message)
    if(message.author_id != client.user._id){
        console.log(`${message.author.username}: ${message.content}`)
    }
});

client.on('message/delete', async(message) => {
    if (messages.length > 10000) {
        messages.shift()
    }
    messages.forEach((msg)=>{
        if (msg._id == message){
            if(msg.author._id != client.user._id){
                console.log(`Message deleted by ${msg.author.username}: ${msg.content}`)
                msg.channel.sendMessage(`Message deleted by ${msg.author.username}: ${msg.content}`)
            }
        }
    })
})

client.loginBot(process.env.RV_TOKEN)