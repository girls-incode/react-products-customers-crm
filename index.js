'use strict';
const http = require('http');
let app = require('./src/serverCreator').create();
const index = require('./src/routes/index');
const port = process.env.PORT || 9000;
let clientAPI;
let interval;

app.use(index);

if (process.env.NODE_ENV === 'development') {
    clientAPI = process.env.CLIENT_DEV_API;
}

if (process.env.NODE_ENV === 'production') {
    clientAPI = process.env.CLIENT_PROD_API;
}

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: clientAPI,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => socket.emit('changeData', new Date()), process.env.SOCKET_INTERVAL);
    socket.on('disconnect', () => {
        clearInterval(interval);
    });
});

server.listen(port, function () {
    console.log('Server is running on ' + port);
});