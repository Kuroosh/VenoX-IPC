//----------------------------------//
///// VenoX Gaming & Fun 2023 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

import chalk from 'chalk';
import { _animals, _shopAnimals, color } from '../../../globals/constants.js';
import { deleteDatabaseAnimal, updateAnimalData } from '../database/index.js';
import ipc from 'node-ipc';
import { createLogEntry, logNames } from '../../../utils/logging/index.js';
const interval = 60 * 60000;

export function syncAnimalIpcHandler() {
	ipc.server.on('animal:insert', (data, socket) => {
		if (_animals[data.id]) return console.log('Animal already exist with ID[' + data.id + ']');
		_animals[data.id] = data.val;
		console.log('received animal:insert');
		createLogEntry(logNames.animals, 'Animal [' + data.id + '] got created now!');
		return ipc.server.broadcast('animal:insert', data);
	});

	ipc.server.on('animal:update', (data, socket) => {
		console.log(JSON.stringify(data));
		const animal = _animals[data.id];
		if (!animal) return;
		_animals[data.id] = data.val;
		console.log('received animal:update');
		return ipc.server.broadcast('animal:update', data);
	});
}

function onSyncTick() {
	console.log(color('[Database]', chalk.green), color(`Started onSyncTick for animal-data.`, chalk.yellowBright));
	const animalArr = Object.values(_animals);
	for (const animal of animalArr) {
		if (animal.hunger - 7 < 0) {
			animal.hunger = 0;
			if (animal.health - 5 < 0) animal.health = 0;
			else animal.health -= 5;

			// stats
			if (animal.speed - 5 < 5) animal.speed = 1;
			else animal.speed -= 5;

			if (animal.stamina - 3 < 3) animal.stamina = 1;
			else animal.stamina -= 3;

			if (animal.strength - 10 < 1) animal.strength = 1;
			else animal.strength -= 10;
		} else {
			/*const shopAnimalData = _shopAnimals.find((x) => x.name == animal.name);
			if (!shopAnimalData) {
				console.log(color('[ERROR]', chalk.redBright), color(`Animal-name for onSyncTick in shopAnimalData@animal-data not found!`, chalk.redBright));
				continue;
			}*/
			animal.hunger -= 7;

			//stats
			if (animal.speed - 5 < 5) animal.speed = 5;
			else animal.speed -= 5;

			if (animal.stamina - 3 < 3) animal.stamina = 3;
			else animal.stamina -= 3;

			if (animal.strength - 10 < 1) animal.strength = 1;
			else animal.strength -= 10;
		}
		if (animal.health == 0) deleteDatabaseAnimal(animal);
		else updateAnimalData(animal);
	}
	setTimeout(() => {
		ipc.server.broadcast('database:loadAnimals', { animals: _animals });
		console.log(color('[Database]', chalk.green), color(`Finished onSyncTick for animal-data.`, chalk.cyanBright));
	}, 10000);
}

setInterval(() => {
	console.log('created interval');
	onSyncTick();
}, interval);
