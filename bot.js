const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'token', alias: 't', type: String }
]
const options = commandLineArgs(optionDefinitions)
if (typeof options.token === "undefined") return console.log("Please pass a token through the -token or -t argument")

global.bot = {
	prefix: "$",
	modules: {},
	moduleList: [],
	invite: "https://discordapp.com/oauth2/authorize?client_id=389975799232462849&scope=bot&permissions=134270016" //mainly put this one here so I don't forget it
}

//edited version of what Nightmare sent in the testing server
fs.readdir("./modules/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No modules to load!");
    }

    console.log(`Loading ${jsfiles.length} modules!`);

    jsfiles.forEach((f, i) => {
        let module = require(`./modules/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.modules[f] = new module(client)
        bot.moduleList.push(f)
        if (typeof bot.modules[f].help !== "undefined") helpList.push(f)
    });
});

client.login(options.token)