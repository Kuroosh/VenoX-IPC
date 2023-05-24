//----------------------------------//
///// VenoX Gaming & Fun 2023 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//
import ipc from 'node-ipc';
import pm2 from 'pm2';
import config from '../config.js';

export function syncRegistrationAPI() {
	ipc.server.on('registrationApi:requestNewSession', (data, socket) => {
		const session = { id: data.id, alias: data.key, val: data.val, parent: data.parent, chatId: data.chatId };
		console.log(JSON.stringify(data));
		console.log(JSON.stringify(session));

		pm2.start(
			{
				name: session.alias,
				script: config.globalPath + 'build\\ipc.js',
				args: ['--color'],
				env: {
					SESSION_ID: session.id + '',
					SESSION_ALIAS: session.alias,
					SESSION_REGISTRATION: JSON.stringify(session.val),
					SESSION_PARENT: session.parent,
				},
			},
			(err, apps) => {
				//pm2.disconnect();
				if (err) {
					console.error(err);
					process.exit(2);
				}
			}
		);
		console.log('Received from process a new Registration');

		//return ipc.server.broadcast('gameSync:OnAddedChallenge', data);
	});

	ipc.server.on('registrationApi:sendOTPResult', (data, socket) => {
		console.log('got OTP Result - sending to client Result');
		return ipc.server.broadcast('registrationApi:onOTPResult', data);
	});
	ipc.server.on('registrationApi:invokeOTP', (data, socket) => {
		console.log('got OTP With data - sending to client Result: ' + JSON.stringify(data));
		return ipc.server.broadcast('registrationApi:addOTP', data);
	});
}
