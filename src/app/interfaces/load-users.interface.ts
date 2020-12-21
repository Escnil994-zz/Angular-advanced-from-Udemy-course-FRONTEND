import { User } from './../models/user.model';
export interface loadUsersInterface{
    total: number,
    users: User[];
}