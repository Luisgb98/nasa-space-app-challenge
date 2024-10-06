import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Planets = {
    id: Generated<number>;
    name: string;
    actualRadius: number;
    scaledRadius: number;
    actualDistanceFromSun: number;
    scaledDistance: number;
    circumference: number;
    rotationPeriod: number;
    rotationSpeed: number;
    translationSpeed: number;
    mayorAxis: number;
    eccentricity: number;
    texture: string;
    dwarf: boolean;
};
export type Satellites = {
    id: Generated<number>;
    name: string;
    actualRadius: number;
    scaledRadius: number;
    actualDistanceFromPlanet: number;
    scaledDistance: number;
    circumference: number;
    rotationPeriod: number;
    rotationSpeed: number;
    translationSpeed: number;
    texture: string;
    planet_name: string;
};
export type Sessions = {
    id: string;
    user_id: string;
    expires_at: Timestamp;
};
export type Stars = {
    id: Generated<number>;
    name: string;
    actualRadius: number;
    scaledRadius: number;
    actualDistance: number | null;
    scaledDistance: number | null;
    circumference: number;
    rotationPeriod: number;
    rotationSpeed: number;
    texture: string;
};
export type Users = {
    id: string;
    email: string;
    password: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    planets: Planets;
    satellites: Satellites;
    sessions: Sessions;
    stars: Stars;
    users: Users;
};
