//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//
import * as mysql from 'mysql';
import { _animals, _bannedNumbers, _groups, _JoinRequests, _shopAnimals, _userItems, _verifiedUser, color } from '../globals/constants.js';
import chalk from 'chalk';
import config from '../config.js';
import { _challenges, _sessions } from '../fun/constants.js';

/*
export const mySQLConnectionPoolConfig = {
	connectionLimit: 10,
	host: 'www.venox-international.com',
	user: 'VenoX_WA_Beta',
	password: '6Bu3di@47&q4eVw577fSv25$0e5',
	database: 'VenoX_WA_Beta',
	charset: 'utf8mb4_bin',
	waitForConnections: true,
	queueLimit: 500,
};
*/

export const mySQLConnectionPoolConfig = {
	connectionLimit: 10,
	host: '127.0.0.1',
	user: 'whatsappbot',
	password: '7G!PLGo/mXaUF.Y9UvecYJOBK!)2rU.Q',
	database: 'whatsappbot',
	charset: 'utf8mb4_bin',
	waitForConnections: true,
	queueLimit: 500,
};

export let mySQLConnection: mysql.Pool;
function createDatabaseConnection() {
	try {
		mySQLConnection = mysql.createPool(mySQLConnectionPoolConfig);

		mySQLConnection.on('error', (err) => {
			console.log('db error', err);
			if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
				// Connection to the MySQL server is usually
				createDatabaseConnection(); // lost due to either server restart, or a
			} else {
				// connnection idle timeout (the wait_timeout
				console.log(err);
			}
		});
		console.log(color('[DATABASE] : Connected to ' + mySQLConnectionPoolConfig.host, chalk.green));
	} catch (ex) {
		console.log(ex);
	}
}

async function loadDatabaseItems(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM `inventory`', (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_userItems[entry.id]) continue;
				_userItems[Number(entry.id)] = entry;
			}
			console.log(color('[DATABASE]', chalk.whiteBright), color(`${tables.length} inventory-informations has been loaded.`, chalk.cyanBright));
			//banWorker.postMessage({ key: eventNames.BanList, value: _bannedNumbers });
			return resolve(true);
		});
	});
}

async function LoadDatabaseTicTacToeSessions(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM `tictactoe`', (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_sessions[entry.id]) continue;
				_sessions[Number(entry.id)] = entry;
			}
			console.log(color('[DATABASE]', chalk.whiteBright), color(`${tables.length} tic-tac-toe session-informations has been loaded.`, chalk.cyanBright));
			//banWorker.postMessage({ key: eventNames.BanList, value: _bannedNumbers });
			return resolve(true);
		});
	});
}
async function loadDatabaseBans(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM `ban`', (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_bannedNumbers[entry.id]) continue;
				_bannedNumbers[Number(entry.id)] = entry;
			}
			console.log(color('[DATABASE]', chalk.magenta), color(`${tables.length} ban-informations has been loaded.`, chalk.red));
			//banWorker.postMessage({ key: eventNames.BanList, value: _bannedNumbers });
			return resolve(true);
		});
	});
}

async function loadDatabaseGroups(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM `groups`', (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_groups[entry.id]) continue;
				entry.allowedCountryCodes = JSON.parse(entry.allowedCountryCodes);
				entry.groupOwner = JSON.parse(entry.groupOwner);
				entry.groupAdmins = JSON.parse(entry.groupAdmins);
				_groups[entry.id] = entry;
			}
			console.log(color('[DATABASE]', chalk.magenta), color(`${tables.length} group-informations has been loaded.`, chalk.red));
			return resolve(true);
		});
	});
}

async function loadDatabaseJoinRequests(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM `join-request`', (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_JoinRequests[Number(entry.id)]) continue;
				_JoinRequests[Number(entry.id)] = entry;
			}
			console.log(color('[DATABASE]', chalk.cyan), color(`${tables.length} join-requests has been loaded.`, chalk.cyan));
			return resolve(true);
		});
	});
}

function updateUserVipPackage(user: any) {
	try {
		const sql = 'UPDATE user set vip_package = ?, vip_till = ? WHERE id = ?';
		mySQLConnection.getConnection(function (err, connection) {
			connection.query(sql, [user.vip_package, user.vip_till, user.id], (err, result) => {
				if (err) console.log(err);
				console.log(color('[Database]', chalk.green), color(`${user.id} received update for his VIP-Package in Userlist.`, chalk.redBright));
				//console.log(result);
			});
			connection.release();
		});
	} catch (exception) {
		console.log(exception);
	}
}

async function loadDatabaseUser(connection: mysql.PoolConnection): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		const sqlString = config.isDebug ? 'SELECT * FROM `user` WHERE adminLevel > 0' : 'SELECT * FROM `user`';
		const currentTime = new Date().getTime();
		connection.query(sqlString, (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) {
				if (_verifiedUser[Number(entry.id)]) continue;
				if (entry.vip_till <= currentTime && entry.vip_package > 0) {
					entry.vip_package = 0;
					updateUserVipPackage(entry);
					console.log('Updated VIP Package');
				}
				_verifiedUser[Number(entry.id)] = entry;
			}
			console.log(color('[DATABASE]', chalk.cyan), color(`${tables.length} user has been loaded.`, chalk.cyan));
			return resolve(true);
		});
	});
}

function loadShopAnimals(connection: mysql.PoolConnection) {
	return new Promise((resolve, reject) => {
		const sqlString = 'SELECT * FROM `animals_shop`';
		connection.query(sqlString, (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) _shopAnimals.push(entry);

			console.log(color('[DATABASE]', chalk.whiteBright), color(`${tables.length} animal-catalog-data has been loaded.`, chalk.cyanBright));
			return resolve(true);
		});
	});
}

function loadAnimals(connection: mysql.PoolConnection) {
	return new Promise((resolve, reject) => {
		const sqlString = 'SELECT * FROM `animals`';
		connection.query(sqlString, (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) _animals[Number(entry.id)] = entry;

			console.log(color('[DATABASE]', chalk.whiteBright), color(`${tables.length} animal-data has been loaded.`, chalk.cyanBright));
			return resolve(true);
		});
	});
}

function LoadGameChallenges(connection: mysql.PoolConnection) {
	return new Promise((resolve, reject) => {
		const sqlString = 'SELECT * FROM `challenges`';
		connection.query(sqlString, (err, tables) => {
			if (err) console.log(err);
			for (const entry of tables) _challenges[Number(entry.id)] = entry;

			console.log(color('[DATABASE]', chalk.whiteBright), color(`${tables.length} Challenge-Requests has been loaded.`, chalk.whiteBright));
			return resolve(true);
		});
	});
}

async function loadAnimalData(connection: mysql.PoolConnection) {
	return new Promise(async (resolve, reject) => {
		await loadShopAnimals(connection);
		await loadAnimals(connection);
		return resolve(true);
	});
}

export async function loadDatabaseTables(): Promise<Boolean> {
	try {
		if (!mySQLConnection) createDatabaseConnection();
		return new Promise((resolve, reject) => {
			mySQLConnection.getConnection(async function (err, connection) {
				await loadDatabaseBans(connection);
				await loadDatabaseGroups(connection);
				await loadDatabaseJoinRequests(connection);
				await loadDatabaseUser(connection);
				await loadAnimalData(connection);
				await loadDatabaseItems(connection);
				await LoadGameChallenges(connection);
				await LoadDatabaseTicTacToeSessions(connection);
				connection.release();
				return resolve(true);
			});
		});
	} catch (exception) {
		console.log(exception);
		return false;
	}
}
