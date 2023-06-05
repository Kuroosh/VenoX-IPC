//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

import { insertDatabaseLog } from './database/index.js';

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
	let currDate = [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('.');

	currDate += ' | ' + padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes()) + ':' + padTo2Digits(date.getSeconds());
	return currDate;
}

export const logNames = {
	exp: 'log_exp',
	animals: 'log_animals',
	level: 'log_level',
	verify: 'log_verify',
	account: 'log_account',
	ban: 'log_ban',
};
export function createLogEntry(log: string, text: string) {
	insertDatabaseLog(log, text);
	//VenoxLog('saved log for ' + log + ' | ' + text);
}
