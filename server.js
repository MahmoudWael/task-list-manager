const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.tasks = [];
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Type a command (help to list commands)')
        });
        client.on('command', (command, args) => {
            switch (command) {
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'Unknown command!')
            }
        })
    }

    displayTasks() {
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n')
    }

    help() {
        this.emit('response', 'Available Commands: \n add [task-name] \n ls \n delete [task-id]');
    }
    add(args) {
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Added task ${this.taskId}`);
        this.taskId++;
    }
    ls() {
        this.emit('response', `List of tasks: \n this.tasks ${this.displayTasks()}`);
    }
    delete(args) {
        this.delete($this.tasks[args[0]])
        this.emit('response', `Task ${args[0]} has been deleted`);
    }
}

module.exports = (client) => new Server(client);