module.exports = {
    event: 'interactionCreate',
    run: async (client, interaction) => {
        let command
        if(interaction.isButton()) {
            let name = interaction.customId.split('.')[0]
            command = client.messageCommands.get(name)
        }
        if(interaction.isStringSelectMenu()) {
            let name = interaction.customId.split('.')[0]
            command = client.stringSelectMenus.get(name)
        }
        if(interaction.isUserSelectMenu()) {
            let name = interaction.customId.split('.')[0]
            command = client.userSelectMenus.get(name)
        }
        if(interaction.isRoleSelectMenu()) {
            let name = interaction.customId.split('.')[0]
            command = client.roleSelectMenus.get(name)
        }
        if(interaction.isChannelSelectMenu()) {
            let name = interaction.customId.split('.')[0]
            command = client.channelSelectMenus.get(name)
        }
        if(interaction.isUserContextMenuCommand()) {
            command = client.userCommands.get(interaction.commandName)
        }
        if(interaction.isMessageContextMenuCommand()) {
            command = client.messageCommands.get(interaction.commandName)
        }
        if(interaction.isChatInputCommand()) {
            command = client.commands.get(interaction.commandName)
        }
        if(interaction.isModalSubmit()) {
            let name = interaction.customId.split('.')[0]
            command = client.modals.get(name)
        }
        if(!command) return
        command.run(client, interaction)

    }
}