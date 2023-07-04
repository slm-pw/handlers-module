module.exports = {
    event: 'ready',
    run: async (client) => {
        let commandsList = client.commands.concat(client.userCommands).concat(client.messageCommands);
        let clientCommands = (await client.application?.commands.fetch()).map(c => c) || []

        for(let command of clientCommands) {
            let cmd1 = {
                name: command.name,
                type: command.type,
                description: command.description,
                options: command.options.map( (option) => {
                    return {
                        name: option.name,
                        type: option.type,
                        description: option.description,
                        required: option.required,
                        choices: option.choices
                    }
                } )
            }
            let c = commandsList.get(command.name)?.options;
            if(!c) return command.delete();
            let cmd2 = {
                name: c.name,
                type: c.type,
                description: c.description,
                options: c?.options?.map( (option) => {
                    return {
                        name: option.name,
                        type: option.type,
                        description: option.description,
                        required: option.required,
                        choices: option.choices
                    }
                })
            }
            if(JSON.stringify(cmd1) !== JSON.stringify(cmd2)) {
                await command.delete();
            }
        }
        commandsList.forEach(async (command) => {
            //@ts-ignore
            if(!clientCommands.find(cmd => cmd.name === command.name)) {
                await client.application?.commands.create(command.options);
            }
        });
    }
}