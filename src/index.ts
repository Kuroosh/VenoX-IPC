import ipc from 'node-ipc';
import pm2 from 'pm2';
import { loadDatabaseTables } from './database/index.js';
import * as constants from './globals/constants.js';
import config from './config.js';
import { _challenges, _sessions } from './fun/constants.js';
import { syncGameHandler } from './fun/games/sync.js';
import { syncAnimalIpcHandler } from './fun/animals/sync/index.js';
ipc.config.id = 'venoxipc';
ipc.config.networkHost = '127.0.0.1';
ipc.config.networkPort = 8000;

// Deaktivieren Sie das Logging
ipc.config.silent = true;
const connectedSockets = new Set<any>();

function broadcastToOther(socket: any, event: string, data: any)
{	console.log('Emitting to other nahui');
	connectedSockets.forEach((otherSocket) => {
        if (otherSocket !== socket) {
            ipc.server.emit(otherSocket, event, data);
        }
    });
}

ipc.serve(async () => {
	await loadDatabaseTables();
	syncGameHandler();
	syncAnimalIpcHandler();

	console.log('Starting VenoX-IPC Server');
	ipc.server.on('connect', (socket) => {
		//ipc.server.broadcast('message', 'yoyooyoyoy');
		connectedSockets.add(socket);
	});

	ipc.server.on('disconnect', (socket) => {
		console.log('Client disconnected:', socket.id);
		connectedSockets.delete(socket);
	});

	ipc.server.on('user:update', (data, socket) => {
		const user = constants._verifiedUser[data.id];
		if (!user || user[data.prop] == data.value) return;
		user[data.prop] = data.value;
		console.log('received user:update');
		return broadcastToOther(socket, 'user:update', data);
		//return ipc.server.broadcast('user:update', data);
		//return ipc.server.broadcast('user:update', data);
	});

	ipc.server.on('ban:removeFromGroups', (data, socket) => {
		//return ipc.server.broadcast('ban:removeFromGroups', data);
		return broadcastToOther(socket, 'ban:removeFromGroups', data);
	});

	ipc.server.on('ban:delete', (data, socket) => {
		//return ipc.server.broadcast('ban:delete', data);
		return broadcastToOther(socket, 'ban:delete', data);
	});

	ipc.server.on('message', (data, socket) => {
		ipc.log('got a message : ' + data);
		ipc.server.emit(socket, 'message', data);
	});

	ipc.server.on('database:forceLoad', (data, socket) => {
		//console.log(data, socket);
		ipc.server.emit(socket, 'database:loadUser', { user: constants._verifiedUser });
		ipc.server.emit(socket, 'database:loadBans', { ban: constants._bannedNumbers });
		ipc.server.emit(socket, 'database:loadGroups', { groups: constants._groups });
		ipc.server.emit(socket, 'database:loadJoinRequests', { joinreq: constants._JoinRequests });
		ipc.server.emit(socket, 'database:loadShopAnimals', { shopAnimals: constants._shopAnimals });
		ipc.server.emit(socket, 'database:loadAnimals', { animals: constants._animals });
		ipc.server.emit(socket, 'database:loadInventoryItems', { items: constants._userItems });
		ipc.server.emit(socket, 'database:loadGameChallenges', { challenges: _challenges });
		ipc.server.emit(socket, 'database:loadTicTacToeSessions', { sessions: _sessions });
		ipc.server.emit(socket, 'database:loadSlotJackpot', { jackpot: constants._slotJackpots });
		ipc.server.emit(socket, 'client:startProcess', true);
		/*ipc.server.emit(socket, 'database:loadTables', {
			user: constants._verifiedUser,
			groups: constants._groups,
			ban: constants._bannedNumbers,
			joinreq: constants._JoinRequests,
		});*/
		console.log('Sent database to client');
	});

	ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
	pm2Connect();
});

ipc.server.start();

function pm2Connect() {
	pm2.connect((err) => {
		if (err) {
			console.error(err);
			process.exit(2);
		}

		Object.values(constants._sessionIds)
			.filter((x) => x.active)
			.forEach((session) => {
				console.log('started session : ' + session.id + ' | ' + session.alias);
				pm2.start(
					{
						name: session.alias,
						script: config.globalPath + 'build\\ipc.js',
						args: ['--color'],
						//watch: false,
						env: {
							SESSION_ID: session.id + '',
							SESSION_ALIAS: session.alias,
						},
					},
					(err, apps) => {
						console.log('Application started:', session.alias);
						pm2.disconnect(); // Disconnect PM2 after starting the application
						//pm2.disconnect();
						if (err) {
							console.error('Failed to start application:', session.alias, err);
							//console.error(err);
							process.exit(2);
						}
					}
				);
			});
	});
}

/*
function killALl() {
	console.log('Called KillAll');
	sessions.forEach((session) => {
		console.log('Called KillAll Session ', session);
		pm2.stop(session, (err, apps) => {
			console.log('Called KillAll stop ', session);
			if (err) {
				console.error(err);
			}
			if (apps) {
				console.log(apps);
			}
		});

		pm2.delete(session, (err, apps) => {
			console.log('Called KillAll delete ', session);
			if (err) {
				console.error(err);
			}
			if (apps) {
				console.log(apps);
			}
		});
	});
	pm2.disconnect();
	process.exit();
}

// Cleanup handler to stop all PM2 processes on exit
process.on('SIGINT', () => {
	killALl();
});

process.on('exit', () => {
	killALl();
});
*/
