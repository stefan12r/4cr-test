import { ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appAddUserHost]',
  standalone: true
})
export class AddUserHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
