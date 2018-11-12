const server = require('net').createServer();

let counter = 0;
let sockets = {};

server.on('connection', socket => {
    socket.id = counter++;
    console.log('Client connected!');
    socket.write('Please enter your name: ');

    socket.on('data', data => {
        if (!sockets[socket.id]) {
            socket.name = data.toString().trim();
            sockets[socket.id] = socket;
            socket.write(`Welcome ${socket.name}\n`)
            return;
        }
        Object.entries(sockets).forEach(([key, clientSocket]) => {
            if (key == socket.id) return;
            clientSocket.write(`${socket.name}: `);
            clientSocket.write(data);
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('client disconnected!');
    });
})

server.listen(3000, () => {
    console.log('Server bound');
})