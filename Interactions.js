const { Collection } = require("discord.js")
const fs = require('fs')

module.exports = async function interactionHandler(client) {

    client.buttons = new Collection()
    client.stringSelectMenus = new Collection()
    client.userSelectMenus = new Collection()
    client.roleSelectMenus = new Collection()
    client.channelSelectMenus = new Collection()
    client.userCommands = new Collection()
    client.messageCommands = new Collection()
    client.commands = new Collection()
    client.modals = new Collection()

    let entities = []
    let files = fs.readdirSync(`${__dirname}/..`)
    for (let file of files) {
        if (!fs.existsSync(`${__dirname}/../${file}/interactions`)) continue
        if (fs.lstatSync(`${__dirname}/../${file}`).isDirectory()) {
            let folderFiles = fs.readdirSync(`${__dirname}/../${file}/interactions`)
            for (let folderFile of folderFiles) {
                checker(`${__dirname}/../${file}/interactions/${folderFile}`, client)
            }
        }
    }
    return entities
}

function checker(dir, client) {
    if(fs.lstatSync(dir).isDirectory()){
        let files = fs.readdirSync(dir)
        for(let file of files){
            checker(`${dir}/${file}`, client)
        }
    } else {
        let interaction = require(dir)
        switch(interaction.type) {
            case 'button':
                client.buttons.set(interaction.name, interaction)
                break
            case 'stringSelectMenu':
                client.stringSelectMenus.set(interaction.name, interaction)
                break
            case 'userSelectMenu':
                client.userSelectMenus.set(interaction.name, interaction)
                break
            case 'roleSelectMenu':
                client.roleSelectMenus.set(interaction.name, interaction)
                break
            case 'channelSelectMenu':
                client.channelSelectMenus.set(interaction.name, interaction)
                break
            case 'userCommand':
                client.userCommands.set(interaction.name, interaction)
                break
            case 'messageCommand':
                client.messageCommands.set(interaction.name, interaction)
                break
            case 'command':
                client.commands.set(interaction.name, interaction)
                break
            case 'modal':
                client.modals.set(interaction.name, interaction)
                break
        }
    }
}