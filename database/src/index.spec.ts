export interface User {
  email: string;
  password: string;
  characters: Character;
  ip: string;
}

export interface Fractions {

}

export interface Character {
    id: number;
    work: string;
    adminlvl: number;
    firstname: string;
    lastname: string;
    gender: number;
    lvl: number;
    money: number;
    bank: number;
    health: number;
    armor: number;
    fraction: string;
    wanted: number;
    warns: number;
    banned: boolean;
    arrest: boolean;
}
