const Discord = require('discord.js')
const client = new Discord.Client()
var channelID = "600565180308520962"; // debug purposes on test server
var kimiID = "149142344275329024";
var aultID = "178686013441441792";
var akioID = "208418156337692673";

client.on('ready', () => {
    client.user.setActivity('Exos Heroes', {
        type: 'WATCHING'
    });
});

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    var generalChannel = client.channels.cache.get("716153499892711454") // Replace with known channel ID
    //generalChannel.send("Hello, world!")

    //generalChannel.send("<@" + akioID + ">" + ' Hi');
    //generalChannel.send("<@&" + "739908848030187571" + ">" + ' Hello');
})

var cron = require("cron");

let squadBattle = new cron.CronJob('00 00 21 * * 1-6', () => {
    // reminder at 9pm pst every mon - sat to finish squad battle
    let channel = client.channels.cache.get(channelID);
    // ping all users in channel
    channel.send("<@" + "716152988435087370" + ">" + ' Remember to finish your squad battle~');
});
squadBattle.start();

let squadReg = new cron.CronJob('00 00 13 * * 0 ', () => {
    // reminder for squad battle enrollment every sunday at 1 pm pst
    let channel = client.channels.cache.get(channelID);
    // ping only deputy master and deputy first mate
    channel.send("<@" + aultID + ">" + ' ' + "<@" + kimiID + ">" + ' Please get us enrolled in squad battles~');
});
squadReg.start();

// we start command prefix QoL additions
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // prevents bot loop answering itself
        return;
    }
    if (receivedMessage.content.startsWith("!")) {
        doCommand(receivedMessage);
    }
});

function doCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let pCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    console.log("Arguments: " + arguments); // most likely none

    if (pCommand == "about") {
        aboutCommand(arguments, receivedMessage);
    }
    if (pCommand == "help") {
        helpCommand(arguments, receivedMessage);
    }
    else if (pCommand == "team") {
        teamCommand(arguments, receivedMessage);
    }
    else if (pCommand == "time") {
        tCommand(arguments, receivedMessage);
    }
}

function helpCommand(args, rmsg) {
    if (args.length < 1) {
        rmsg.channel.send("!about: About the bot.\n!help: Bot commands and functionalities.\n" +
            "!team: Current meta or recommended team lineups\n!time: Current time in Pacific timezone.")
    }
    else {
        rmsg.channel.send("Yes")
    }
}
function aboutCommand(args, rmsg) {
    if (args.length < 1) {
        rmsg.channel.send("Created by: Akio #2470 and written in Javascript. \nThis bot allows users to stay" +
            " relevant in squadron duties by pinging everyone with the Exos Heroes role and reminding them to " +
            "finish their battles every Monday - Saturday at 9PM PST. It will also ping the Deputy Master and " +
            "Deputy First Mate to remind them to enroll in the week's squadron battle every Sunday at 1PM PST. " +
            "New features will be added in the near future. Thank you for using the EHT bot.")
    }
    else {
        rmsg.channel.send("Created by: Akio #2470 and written in Javascript. \nThis bot allows users to stay" +
            " relevant in squadron duties by pinging everyone with the Exos Heroes role and reminding them to " +
            "finish their battles every Monday - Saturday at 9PM PST. It will also ping the Deputy Master and " +
            "Deputy First Mate to remind them to enroll in the week's squadron battle every Sunday at 1PM PST. " +
            "New features will be added in the near future. Thank you for using the EHT bot.")
    }
}
function teamCommand(args, rmsg) {
    if (args.length < 1) {
        rmsg.channel.send("Bathory works with: Rera, Uloom \n\n" +
            "Garff with: Rudley, Valaar\n\n" + "Raykel with : FC Zeon, XiaKhan, Baraka\n\n" +
            "Shufraken with: Ramge, Valentina\n\n" + "Jinai with : Jinn, Shell\n\n" +
            "Meta 1: FC Shufraken + FC Iris & FC Bathory + FC Annie + FC Rera\n\n" +
            "Meta 2: FC Uloom + Garff & FC Bathory + FC Annie + FC Rera")
    }
    else {
        rmsg.channel.send("Error, too many arguments.")
    }
}
function tCommand(args, rmsg) {
    if (args.length < 1) {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        rmsg.channel.send(hour + ":" + min + ":" + sec + ' Pacific');
    }
    else {
        rmsg.channel.send("Error, too many arguments.");
    }
}
client.login("NzM5NzA0MDY3ODQwMDE2NTA1.XyeVGA.XqrsBkjAodzfRo1T6hJ7HFmntMg")