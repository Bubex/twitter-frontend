import socketio from 'socket.io-client';

const socket = socketio(process.env.REACT_APP_API_URL, {
    autoConnect: false,
});

function subscribeToUpdateMe(subscribeFunction) {
    socket.on('update-me', subscribeFunction);
}

function subscribeToUpdateProfile(subscribeFunction) {
    socket.on('update-profile', subscribeFunction);
}

function connect(me, listening) {
    socket.io.opts.query = { me, listening };

    if(me !== undefined && listening !== undefined) {
        console.log('nova conexão: ' + me + ' - ' + listening);
        socket.connect();
    }
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
    subscribeToUpdateProfile
};