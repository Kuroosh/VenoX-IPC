//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

import chalk from 'chalk';
import { mySQLConnection } from '../../../database/index.js';
import { color } from '../../../globals/constants.js';
import { formatDate } from '../index.js';

export function insertDatabaseLog(tableName: string, log: string) {
	try {
		mySQLConnection.getConnection(function (err, connection) {
			if (err) return console.log(err);
			const sql = 'INSERT INTO `' + tableName + '`(`date`, `log` ) VALUES ?';
			const values = [[formatDate(new Date()), log]];
			connection.query(sql, [values], (err, result) => {
				if (err) console.log(err);
				console.log(color('[Database]', chalk.green), color(`${tableName} log got created! | Date : ` + formatDate(new Date()), chalk.cyan));
			});
			connection.release();
		});
	} catch (exception) {
		console.log(exception);
	}
}
