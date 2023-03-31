import { NgFor, AsyncPipe, NgClass } from '@angular/common';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { User } from '@models/user';
import { editUserToggleActiveButtonClicked } from '@user_state/users.actions';
import { UsersQuery } from '@user_state/users.query';
import {ReplaySubject, takeUntil, tap} from 'rxjs'
import { AddUserHostDirective } from './directives/add-user-host.directive';
import { AddUserComponent } from './ui/add-user/add-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgClass, AddUserHostDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild(AddUserHostDirective, {static: true}) appAddUserHost!: AddUserHostDirective;

  private actions = inject(Actions);
  private destroys$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  isAddUserDisabled: boolean = false;
  users$ = inject(UsersQuery).selectUsers$.pipe(
    tap(users => {
      this.isAddUserDisabled = users.length >= 5 || users.some(user => !user.active)
    })
  )

  public trackBy = (index: number, item: any) => item.id || index;

  public openModal(): void {
    const viewContainerRef = this.appAddUserHost.viewContainerRef;
    viewContainerRef.clear();

    const component = viewContainerRef.createComponent<AddUserComponent>(AddUserComponent);
    component.instance.closeModal$.pipe(takeUntil(this.destroys$)).subscribe(() => this.removeDynamicComponent(component));
  }

  public toggleUserActive(user: User): void {
    const editedUser = {
      ...user,
      active: !user.active
    };
    this.actions.dispatch(editUserToggleActiveButtonClicked(({user: editedUser})))
  }

  removeDynamicComponent(component: any) {
    component.destroy();
  }

  ngOnDestroy(): void {
    this.destroys$.next(true);
    this.destroys$.unsubscribe();
  }
}
