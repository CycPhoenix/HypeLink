const Discord = require("discord.js");
const fetch = require('node-fetch');
const e = require('../embeds.json');
const owner = require('../owner.json');
const os = require('os');

module.exports = {
    name: 'ping',
    description: 'Returns the bot\'s ping :flushed:',
    cat: 'other',
    alias: ['p', 'test', 'hi', 'hello', 'ilovetheflushedemojiverymuch'],
    guild: false,
    async execute(message, args, client) {
        let latency = Math.abs(Math.floor(Date.now() - message.createdTimestamp + require('../config.json').pingClock));
        let apiping = Math.floor(client.ws.ping);

        message.channel.send(new Discord.MessageEmbed().setDescription(`${e.loading} Pinging...`))
            .then(async(newmsg) => {
                let roundtrip = Math.abs(Math.floor(Date.now() - newmsg.createdTimestamp));
                let hyp = Date.now();
                let hypms = ':x: probs dead lol';

                await fetch('https://api.hypixel.net/', {
                    timeout: 10000
                }).then(() => {
                    hypms = Math.abs(Math.floor(Date.now() - hyp)) + 'ms'
                }).catch((e) => {
                    // console.error(e);
                })

                let total_mem = Math.floor(os.totalmem() / 1024 / 1024);
                let free_mem = Math.floor(os.freemem() / 1024 / 1024);

                // console.log(total_mem, free_mem);

                newmsg.edit(new Discord.MessageEmbed().setDescription(
                    `:ping_pong: **Pong!**\n` +
                    `☁️ **Latency**: ${latency.toLocaleString()}ms\n` +
                    `🤖 **API**: ${apiping.toLocaleString()}ms\n` +
                    `♻️ **Roundtrip**: ${roundtrip.toLocaleString()}ms\n` +
                    `${e.logo} **Hypixel**: ${hypms.toLocaleString()}\n\n` +
                    `:flushed: **Memory**: ${free_mem.toLocaleString()}MB out of ${total_mem.toLocaleString()}MB`
                ).setFooter(`Bot by ${owner.tag} | https://bonk.ml/`, owner.avatarURL)).then(() => {
                    if (message.guild) {
                        if (!message.member.hasPermission('MANAGE_MESSAGES')) newmsg.delete({ timeout: 10000 }).catch();
                    }
                }).catch();
            }).catch();
    },
};