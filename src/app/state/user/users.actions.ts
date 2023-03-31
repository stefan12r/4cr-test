import { createAction, props } from "@datorama/akita-ng-effects";
import { User } from "@models/user";

export const addUserFormSubmitted = createAction(
  "Add User Item Form Submitted",
  props<{ user: User }>()
);

export const editUserToggleActiveButtonClicked = createAction(
  "Edit User Toggle Active Button Clicked",
  props<{ user: User }>()
);