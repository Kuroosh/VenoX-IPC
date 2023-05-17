//----------------------------------//
///// VenoX Gaming & Fun 2023 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

export default interface TicTacToeSession {
	id: number;
	creator: number;
	enemy: number;
	reward: number;
	creator_val: number[];
	enemy_val: number[];
	created: number;
	accepted: boolean;
}
