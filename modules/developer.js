const Discord = require("discord.js")
const git = require("simple-git")

const admins = ["227376221351182337"]

module.exports = class Developer {
	constructor(client) {
		this.commands = ["reload", "stop", "update"]
		this.client = client
	}
	reload(message) {
		if (admins.includes(message.author.id)) {
			try {
				console.log("Attempting to reload module: " + message.content.toLowerCase().replace(bot.prefix + "reload ", ""))
				delete require.cache[require.resolve(`./${message.content.toLowerCase().replace(bot.prefix+"reload ", "")}.js`)];
				delete bot.modules[`./${message.content.toLowerCase().replace(bot.prefix+"reload ", "")}.js`]
				var module = require(`./${message.content.toLowerCase().replace(bot.prefix+"reload ", "")}.js`)
				bot.modules[message.content.toLowerCase().replace(bot.prefix + "reload ", "") + ".js"] = new module(this.client, bot)
				bot.moduleList.splice(bot.moduleList.indexOf(message.content.toLowerCase().replace(bot.prefix + "reload ", "") + ".js"), 1)
				console.log("Module: " + message.content.toLowerCase().replace(bot.prefix + "reload ", "") + " has been successfully reloaded.")
				message.reply("Module: `" + message.content.toLowerCase().replace(bot.prefix + "reload ", "") + "` has been successfully reloaded.")
			} catch (e) {
				console.log("Error: " + e)
				message.reply("Module: `" + message.content.toLowerCase().replace(bot.prefix + "reload ", "") + "` could not be reloaded.")
			}
		}
	}
	stop(message) {
		message.reply("Stopping bot")
	}
	update(message) {
		if (!admins.includes(message.author.id)) return;
		var client = this.client;
		git.pull(function (err, update) {
			if (err) console.log(err.toString());
			if (!update) return console.log("no update");
			console.log(chalk.yellow("Updating bot"));
			// FIND WAY TO RESTART PROCESS HERE
			bot.moduleList.length = 0;
			fs.readdir("./modules/", (err, files) => {
				if (err) console.error(err);

				let jsfiles = files.filter(f => f.split(".").pop() === "js");
				if (jsfiles.length <= 0) {
					console.log("No modules to load!");
				}

				bot.moduleList.length = []
				console.log(`Loading ${jsfiles.length} modules!`);

				jsfiles.forEach((f, i) => {
					delete require.cache[require.resolve(`./${f}`)];
					let module = require(`./${f}`);
					console.log(`${i + 1}: ${f} loaded!`);
					bot.modules[f] = new module(client, bot)
					bot.moduleList.push(f)
					if (typeof bot.modules[f].help !== "undefined") helpList.push(f)
				});
			});
		})
	}
	help(message) {
		var help = new Discord.RichEmbed()
		.setTitle("Developer Help")
		.setDescription("These commands can only be used by developers of the bot. Do not bother using them if you are not a developer.")
		.addField("reload <module>", "Reloads the specified module")
		.addField("stop", "Stops the bot")
		.addField("update", "Updates the bot from the Github repository and restarts all modules")
		.setColor(bot.getRandomColor())
		message.channel.send(help)
	}
}