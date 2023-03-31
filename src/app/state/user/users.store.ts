import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { User } from "@models/user";
import { generateUid } from "@utils/utils";


export interface UsersState {
  users: User[];
}

export function createInitialState(): UsersState {
  return {
    users: [...Array(2).keys()].map(i => {
        return {
            active: true,
            id: generateUid(),
            name: `User ${i}`
        }
    })
        
  };
}

@StoreConfig({ name: "users" })
@Injectable({ providedIn: "root" })
export class UsersStore extends Store<UsersState> {
  constructor() {
    super(createInitialState());
  }
}