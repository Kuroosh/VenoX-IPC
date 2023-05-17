//----------------------------------//
///// VenoX Gaming & Fun 2023 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//
import ipc from 'node-ipc';

export function syncGameHandler() {
	ipc.server.on('gameSync:addChallenge', (data, socket) => {
		return ipc.server.broadcast('gameSync:OnAddedChallenge', data);
	});
	ipc.server.on('gameSync:removeChallenge', (data, socket) => {
		return ipc.server.broadcast('gameSync:OnRemovedChallenge', data);
	});
}
