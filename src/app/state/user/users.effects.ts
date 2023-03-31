import { inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@datorama/akita-ng-effects";
import { UsersStore } from "./users.store";
import * as UsersActions from "./users.actions";
import { tap } from "rxjs";

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private usersStore = inject(UsersStore);

    addUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UsersActions.addUserFormSubmitted),
            tap((action) => {
                const user = action.user;
                const users = this.usersStore.getValue().users;
                this.usersStore.update((state) => ({
                    ...state,
                    users: [...users, user],
                }));
            })
        )
    )

    editUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UsersActions.editUserToggleActiveButtonClicked),
            tap((action) => {
                let user = action.user;
                const users = this.usersStore.getValue().users;
                const userIndex = users.findIndex(
                    (item) => item.id === user.id
                );
                const updatedUsers = [...users];
                updatedUsers[userIndex] = user;
                this.usersStore.update((state) => ({
                    ...state,
                    users: updatedUsers,
                }));
            })
        )
    )
}