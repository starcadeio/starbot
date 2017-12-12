//This file was seperated from the main bot.js to enable reloading of this file.

module.exports = class Main {
	constructor(client) {
		client.on("ready", ()=>{
			console.log("StarBot ready!")
			client.user.setGame(`Use ${bot.prefix}help!`)
		})
		client.on("message", (msg)=>{
			
		})
	}
}