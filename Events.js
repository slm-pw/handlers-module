const fs = require('fs')

module.exports = async function eventsHandler(client) {
    let entities = []
    let files = fs.readdirSync(`${__dirname}/..`)
    for (let file of files) {
        if (!fs.existsSync(`${__dirname}/../${file}/events`)) continue
        if (fs.lstatSync(`${__dirname}/../${file}`).isDirectory()) {
            let folderFiles = fs.readdirSync(`${__dirname}/../${file}/events`)
            for (let folderFile of folderFiles) {
                checker(`${__dirname}/../${file}/events/${folderFile}`, client)
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
        let event = require(dir)
        if(event.event) {
            client.on(event.event, event.run.bind(null, client))
        }
    }
}