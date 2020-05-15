import socketio from 'socket.io-client';

const socket = socketio('http://127.0.0.1:3333/', {
    autoConnect: false,
});

function subscribeToUpdateMe(subscribeFunction) {
    socket.on('update-me', subscribeFunction);
}

function subscribeToUpdateProfile(subscribeFunction) {
    socket.on('update-profile', subscribeFunction);
}

function subscribeToUpdateDashboard(subscribeFunction) {
    socket.on('update-dashboard', subscribeFunction);
}

function connect(me, listening) {
    socket.io.opts.query = { me, listening };
    socket.connect();
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToUpdateMe,
    subscribeToUpdateProfile,
    subscribeToUpdateDashboard
};