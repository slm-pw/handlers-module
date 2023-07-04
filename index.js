let events = require('./Events')
let interactions = require('./Interactions')

module.exports = (settings) => {
    return {
        clientMixin: (client) => {
            events(client);
            interactions(client);
        }
    }
}