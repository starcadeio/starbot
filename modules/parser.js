//This file was seperated from the main bot.js to enable reloading of this file.
const Discord = require("discord.js")

const number = {
	"0": "zero",
	"1": "one",
	"2": "two",
	"3": "three",
	"4": "four",
	"5": "five",
	"6": "six",
	"7": "seven",
	"8": "eight",
	"9": "nine"
}
function format(text) {
	if(!isNaN(text.split("")[0])) {
		text = text.split("")
		text[0] = number[text[0]]
		text = text.join("")
	}
	return text;
}

module.exports = class Parser {
	constructor(client) {
		// this.commands = ["help", "ping", "info", "invite", "discord"]
		this.client = client
		client.on("ready", ()=>{
			console.log(client.user.username+" ready!")
			client.user.setGame(`Use ${bot.prefix}help!`)
		})
		client.on("message", (message)=>{
			//Do not put any commands in this function other than the ones already here.
			if (message.channel.type !== "text" || !message.content.toLowerCase().startsWith(bot.prefix)) return;
			
			var command = format(message.content.split(" ")[0].replace(bot.prefix, "").toLowerCase())
			for(var i=0;i<bot.moduleList.length;i++) {
				if(typeof bot.modules[bot.moduleList[i]].commands === "undefined") return;
				if(bot.modules[bot.moduleList[i]].commands.includes(command)) {
					bot.modules[bot.moduleList[i]][command](message);
				}
			}
		});
		client.on("guildCreate", (guild)=>{
			guild.defaultChannel.send(`**Hello there, and thank you for adding me to your server!**\nThis bot, while primarily focused around the Pockey.io game, does have additional fun commands and such, all of which can be found using the \`$help\` command!\n Please enjoy the bot, and if you have any questions, feel free to join the official Pockey.io Discord guild and let one of us bot developers know! (LegusX, BlueStar, NightmaresDev)\n${bot.discord}`);
		})
	}
}