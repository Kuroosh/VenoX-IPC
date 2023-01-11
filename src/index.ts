import ipc from 'node-ipc';

ipc.config.id = 'venoxipc';
ipc.config.networkHost = '127.0.0.1';
ipc.config.networkPort = 8000;

ipc.serve(() => {
    console.log('Starting IPC Server Lol');
    ipc.server.on("connect", () => {
        ipc.server.broadcast("message", "yoyooyoyoy");
    });

    ipc.server.on('ban:checkAllGroups', (data, socket) => {
        ipc.log('got a checkAllGroupsEvent with ' + data);
    });

    ipc.server.on('message', (data, socket) => {
        ipc.log('got a message : ' + data);
        ipc.server.emit(socket, 'message', data);
    });
});

ipc.server.start();
