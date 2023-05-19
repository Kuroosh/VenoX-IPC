//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

import * as chalk from 'chalk';
import BannedUser from '../typings/banned-user';
import { GroupData } from '../typings/group-data';
import JoinRequest from '../typings/join-request';
import VenoxUser from '../typings/user/venox-user';
import ShopAnimal from '../fun/animals/typings/shop-d';
import Animal from '../fun/animals/typings/animal-d';
import Item from '../typings/user/venox-inventory';
import SessionModel from '../typings/session-model';

export const _sessionIds: { [index: number]: SessionModel } = {};

export const _userItems: { [index: number]: Item } = {};

export const _bannedNumbers: { [index: number]: BannedUser } = {};

export const _JoinRequests: { [index: number]: JoinRequest } = {};

export const _verifiedUser: { [index: number]: VenoxUser } = {};

export const _groups: { [index: string]: GroupData } = {};

export const _shopAnimals: ShopAnimal[] = [];
export const _animals: { [index: number]: Animal } = {};

export const color = (text: string, _chalkInstance: chalk.Chalk) => {
	return !color ? chalk.default.green(text) : _chalkInstance(text);
};
