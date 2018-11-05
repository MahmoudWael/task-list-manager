const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
    }
}


module.exports = (client) => new Server(client);