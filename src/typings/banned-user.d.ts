//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////
//----------------------------------//

export default class BannedUser {
	constructor() {}

	id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	formattedName: string;
	public get formattedName(): string {
		return this._formattedName;
	}
	public set formattedName(value: string) {
		this._formattedName = value;
	}

	isBusiness: number;
	public get isBusiness(): number {
		return this._isBusiness;
	}
	public set isBusiness(value: number) {
		this._isBusiness = value;
	}

	admin_id: number;
	public get admin_id(): number {
		return this._admin_id;
	}
	public set admin_id(value: number) {
		this._admin_id = value;
	}

	admin_username: string;
	public get admin_username(): string {
		return this._admin_username;
	}
	public set admin_username(value: string) {
		this._admin_username = value;
	}

	reason: string;
	public get reason(): string {
		return this._reason;
	}
	public set reason(value: string) {
		this._reason = value;
	}

	date: number;
	public get date(): number {
		return this._date;
	}
	public set date(value: number) {
		this._date = value;
	}

	isTemp: number;
	public get isTemp(): number {
		return this._isTemp;
	}
	public set isTemp(value: number) {
		this._isTemp = value;
	}

	bannedTill: number;
	public get bannedTill(): number {
		return this._bannedTill;
	}
	public set bannedTill(value: number) {
		this._bannedTill = value;
	}

	validOnTelegram: boolean;
	public get validOnTelegram(): boolean {
		return this._validOnTelegram;
	}
	public set validOnTelegram(value: boolean) {
		this._validOnTelegram = value;
	}
}
