import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms'
import { Actions } from '@datorama/akita-ng-effects';
import { User } from '@models/user';
import { addUserFormSubmitted } from '@user_state/users.actions';
import { generateUid } from '@utils/utils';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  private formBuilder = inject(FormBuilder);
  private actions = inject(Actions);
  @Output() closeModal$: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  userForm = this.formBuilder.group({
    name: this.formBuilder.control(null, {validators: Validators.required}),
    active: this.formBuilder.control(false, {validators: Validators.required})
  })

  public submitForm() {
    this.userForm.markAllAsTouched();
    if(this.userForm.invalid) return;
    let user: User = {
      name: this.userForm.value.name!,
      active: this.userForm.value.active!,
      id: generateUid()
    }
    this.actions.dispatch(addUserFormSubmitted({user: user}))
    this.closeModal();
  }

  public closeModal() {
    this.closeModal$.emit(true)
  }
}
