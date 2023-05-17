//----------------------------------//
///// VenoX Gaming & Fun 2022 © ///////
//////By Solid_Snake & VnX RL Crew////
////www.venox-international.com////////


//----------------------------------//
export interface GroupData {
    id: string;
    name: string;
    link: link;
    allowedCountryCodes: number[];
    checkLinks: boolean;
    checkCountryCodes: boolean;
    checkNSFW: boolean;
    checkSpam: boolean;
    checkBanList: boolean;
    checkLevel: boolean;
    communityInvite: boolean;
    greet: boolean;
    verifiedOnly: boolean;
    greetText: string;
    leaveText: string;
    greetPicture: string;
    leavePicture: string;
    renderEmoji: boolean;
    groupOwner: number[];
    groupAdmins: number[];
    groupAdText: string;
    groupAdCooldown: number;
}

export type GroupDataModel = {
    [key: number]: GroupData;
};
