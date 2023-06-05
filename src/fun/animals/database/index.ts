//----------------------------------//
///// VenoX Gaming & Fun 2023 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

import chalk from 'chalk';
import { mySQLConnection } from '../../../database/index.js';
import { _animals, color } from '../../../globals/constants.js';
import Animal from '../typings/animal-d.js';
import ipc from 'node-ipc';
import { createLogEntry, logNames } from '../../../utils/logging/index.js';

export function updateAnimalData(animal: Animal) {
	try {
		const sql = 'UPDATE animals set hunger = ?, health = ?, stamina = ?, strength = ?, speed = ? WHERE id = ?';
		mySQLConnection.getConnection(function (err, connection) {
			connection.query(sql, [animal.hunger, animal.health, animal.stamina, animal.strength, animal.speed, animal.id], (err, result) => {
				if (err) console.log(err);
				//console.log(color('[Database]', chalk.green), color(`${animal.id} received update in animal-list.`, chalk.greenBright));
				//VenoxLog(result);
			});
			connection.release();
		});
	} catch (exception) {
		console.log(exception);
	}
}

export function deleteDatabaseAnimal(animal: Animal) {
	try {
		createLogEntry(logNames.animals, 'Animal [' + animal.id + '] got deleted! ' + JSON.stringify(animal));
		mySQLConnection.getConnection(function (err, connection) {
			const sql = 'DELETE from `animals` WHERE `id` = ' + connection.escape(animal.id);
			connection.query(sql, (err, result) => {
				if (err) console.log(err);
				let animalEntry = _animals[animal.id];
				if (!animalEntry) return console.log('animal-entry doesnt exist! entry : ' + animalEntry);
				delete _animals[animal.id];
				//process.send!({ ev: 'ban:delete', data: { id: Number(banId.replace(/[^0-9]/g, '')) } });
				ipc.server.broadcast('animal:delete', { id: animal.id });
				console.log(color('[Database]', chalk.green), color(`${animal.id} got removed from animal-list.`, chalk.redBright));
			});
			connection.release();
		});
	} catch (exception) {
		console.log(exception);
	}
}
