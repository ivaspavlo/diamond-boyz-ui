import { Directive, Self, HostListener } from '@angular/core';
import { ControlContainer } from '@angular/forms';


@Directive({
  selector: '[markTouched]'
})
export class MarkTouchedDirective {

  @HostListener('submit') onSubmit() {
    this.container?.control?.markAllAsTouched();
  }

  constructor(
    @Self() private container: ControlContainer
  ) { }
}
