//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////

import Inventory from './venox-inventory';

//----------------------------------//
function sendUpdateToMaster(id: any, prop: any, value: any) {
	return;
}

export default class VenoxUser {
	id: number = -1;

	private _email: string = '';
	public get email(): string {
		return this._email;
	}
	public set email(value: string) {
		if (this._email == value) return;
		sendUpdateToMaster(this.id, 'email', value);
		this._email = value;
	}

	private _password: string = '';
	public get password(): string {
		return this._password;
	}
	public set password(value: string) {
		if (this._email == value) return;
		sendUpdateToMaster(this.id, 'password', value);
		this._password = value;
	}

	private _money: number = 0;
	public get money(): number {
		return this._money;
	}
	public set money(value: number) {
		if (this._money == value) return;
		sendUpdateToMaster(this.id, 'money', value);
		this._money = value;
	}

	private _formattedName: string = '';
	public get formattedName(): string {
		return this._formattedName;
	}
	public set formattedName(value: string) {
		if (this._formattedName == value) return;
		sendUpdateToMaster(this.id, 'formattedName', value);
		this._formattedName = value;
	}

	private _socialState: string = '';
	public get socialState(): string {
		return this._socialState;
	}
	public set socialState(value: string) {
		if (this._socialState == value) return;
		sendUpdateToMaster(this.id, 'socialState', value);
		this._socialState = value;
	}

	private _groupId: string = '';
	public get groupId(): string {
		return this._groupId;
	}
	public set groupId(value: string) {
		if (this._groupId == value) return;
		sendUpdateToMaster(this.id, 'groupId', value);
		this._groupId = value;
	}

	/* Security */
	lastMessage: Date;
	warnLevel: number = 0;

	private _creation_date: number = 0;
	public get creation_date(): number {
		return this._creation_date;
	}
	public set creation_date(value: number) {
		if (this._creation_date == value) return;
		sendUpdateToMaster(this.id, 'creation_date', value);
		this._creation_date = value;
	}

	private _verified_date: number = 0;
	public get verified_date(): number {
		return this._verified_date;
	}
	public set verified_date(value: number) {
		if (this._verified_date == value) return;
		sendUpdateToMaster(this.id, 'verified_date', value);
		this._verified_date = value;
	}

	private _adminLevel: number = 0;
	public get adminLevel(): number {
		return this._adminLevel;
	}
	public set adminLevel(value: number) {
		if (this._adminLevel == value) return;
		sendUpdateToMaster(this.id, 'adminLevel', value);
		this._adminLevel = value;
	}

	private _isVerified: boolean = false;
	public get isVerified(): boolean {
		return this._isVerified;
	}
	public set isVerified(value: boolean) {
		if (this._isVerified == value) return;
		sendUpdateToMaster(this.id, 'isVerified', value);
		this._isVerified = value;
	}

	private _verified_name: string = '';
	public get verified_name(): string {
		return this._verified_name;
	}
	public set verified_name(value: string) {
		if (this._verified_name == value) return;
		sendUpdateToMaster(this.id, 'verified_name', value);
		this._verified_name = value;
	}

	private _verified_age: number = 0;
	public get verified_age(): number {
		return this._verified_age;
	}

	public set verified_age(value: number) {
		if (this._verified_age == value) return;
		sendUpdateToMaster(this.id, 'verified_age', value);
		this._verified_age = value;
	}

	private _verified_city: string = '';
	public get verified_city(): string {
		return this._verified_city;
	}
	public set verified_city(value: string) {
		if (this._verified_city == value) return;
		sendUpdateToMaster(this.id, 'verified_city', value);
		this._verified_city = value;
	}

	private _verified_picture: string = '';
	public get verified_picture(): string {
		return this._verified_picture;
	}
	public set verified_picture(value: string) {
		if (this._verified_picture == value) return;
		sendUpdateToMaster(this.id, 'verified_picture', value);
		this._verified_picture = value;
	}

	private _verified_admin_id: number = 0;
	public get verified_admin_id(): number {
		return this._verified_admin_id;
	}
	public set verified_admin_id(value: number) {
		if (this._verified_admin_id == value) return;
		sendUpdateToMaster(this.id, 'verified_admin_id', value);
		this._verified_admin_id = value;
	}

	private _verified_admin_username: string = '';
	public get verified_admin_username(): string {
		return this._verified_admin_username;
	}
	public set verified_admin_username(value: string) {
		if (this._verified_admin_username == value) return;
		sendUpdateToMaster(this.id, 'verified_admin_username', value);
		this._verified_admin_username = value;
	}

	private _level_background: string = '';
	public get level_background(): string {
		return this._level_background;
	}
	public set level_background(value: string) {
		if (this._level_background == value) return;
		sendUpdateToMaster(this.id, 'level_background', value);
		this._level_background = value;
	}

	private _me_background: string = '';
	public get me_background(): string {
		return this._me_background;
	}
	public set me_background(value: string) {
		if (this._me_background == value) return;
		sendUpdateToMaster(this.id, 'me_background', value);
		this._me_background = value;
	}

	private _exp: number = 0;
	public get exp(): number {
		return this._exp;
	}
	public set exp(value: number) {
		if (this._exp == value) return;
		sendUpdateToMaster(this.id, 'exp', value);
		this._exp = value;
	}

	private _levelName: string = '';
	public get levelName(): string {
		return this._levelName;
	}
	public set levelName(value: string) {
		if (this._levelName == value) return;
		sendUpdateToMaster(this.id, 'levelName', value);
		this._levelName = value;
	}

	private _vip_package: number = 0;
	public get vip_package(): number {
		return this._vip_package;
	}
	public set vip_package(value: number) {
		if (this._vip_package == value) return;
		sendUpdateToMaster(this.id, 'vip_package', value);
		this._vip_package = value;
	}

	private _vip_till: number = 0;
	public get vip_till(): number {
		return this._vip_till;
	}
	public set vip_till(value: number) {
		if (this._vip_till == value) return;
		sendUpdateToMaster(this.id, 'vip_till', value);
		this._vip_till = value;
	}

	private _language: string = '';
	public get language(): string {
		return this._language;
	}
	public set language(value: string) {
		if (this._language == value) return;
		sendUpdateToMaster(this.id, 'language', value);
		this._language = value;
	}

	private _coins: number = 0;
	public get coins(): number {
		return this._coins;
	}
	public set coins(value: number) {
		if (this._coins == value) return;
		sendUpdateToMaster(this.id, 'coins', value);
		this._coins = value;
	}

	private _daily_date: number = 0;
	public get daily_date(): number {
		return this._daily_date;
	}
	public set daily_date(value: number) {
		if (this._daily_date == value) return;
		sendUpdateToMaster(this.id, 'daily_date', value);
		this._daily_date = value;
	}

	public inventory: Inventory;
}
