import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Sessions = {
    id: string;
    user_id: string;
    expires_at: Timestamp;
};
export type Users = {
    id: Generated<number>;
    userId: string;
    email: string;
    password: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    sessions: Sessions;
    users: Users;
};
