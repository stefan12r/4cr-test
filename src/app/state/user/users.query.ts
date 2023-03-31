import {Injectable} from "@angular/core";
import { Query } from "@datorama/akita";
import { UsersState, UsersStore } from "./users.store";

@Injectable({
    providedIn: 'root'
})
export class UsersQuery extends Query<UsersState> {
    selectUsers$ = this.select("users");

    constructor(store: UsersStore) {
        super(store);
    }
}