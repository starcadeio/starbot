const Discord = require("discord.js")

//Pulled from: https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

module.exports = class General {
	constructor(client) {
		this.commands = ["ping", "help", "invite", "discord"]
		this.client = client
		client.on("message", async msg =>{
			if (msg.content.startsWith(bot.prefix + "ping")) {
				const message = await msg.channel.send("x ms");
				return message.edit(message.createdTimestamp - msg.createdTimestamp + " ms");
			}
		})
	}
	help(message) {
		if (message.content.split(" ").length > 1) {
			if (message.content.toLowerCase().split(" ")[1] === "general") {
				var help = new Discord.RichEmbed()
				.setTitle("General Help")
				.setDescription("All commands under the `general` category")
				.addField("ping", "Gives a rough estimate of the bot's ping")
				.addField("help", "Brings up the bot's help menu")
				.addField("invite", "A link that allows you to add this bot to any server you own!")
				.addField("discord", "An invite to the official Starcade Discord server.")
				.setColor(getRandomColor())
				message.channel.send(help)
			}
			else if (bot.helpList.includes(message.content.toLowerCase().split(" ")[1]+".js")) bot.modules[message.content.toLowerCase().split(" ")[1]+".js"].help(message)
		}
		else {
			var helpMessage = new Discord.RichEmbed()
			.setTitle(`${this.client.user.username} Help`)
			.setDescription(`Use ${bot.prefix}help <list name> to get the full list of commands for a list (Don't use the <>)`)
			var lists = "▫"+bot.helpList[0].replace(".js", "").split("")[0].toUpperCase()+bot.helpList[0].replace(".js", "").substr(1)
			for (var i=1;i<bot.helpList.length;i++) {
				lists+="\n▫"+bot.helpList[i].replace(".js", "").split("")[0].toUpperCase()+bot.helpList[i].replace(".js", "").substr(1)
			}
			helpMessage.addField("Command Lists", lists)
			.setThumbnail(this.client.user.avatarURL)
			message.channel.send(helpMessage)
		}
	}
	invite(message) {
		message.channel.send(`Use this link: \n${bot.invite}\n to invite ${this.client.user.username} to your own Discord server!`)
	}
	discord(message) {
		message.channel.send(`Join the official Starcade discord!\n${bot.discord}`)
	}
	ping(){
		return;
	}
}