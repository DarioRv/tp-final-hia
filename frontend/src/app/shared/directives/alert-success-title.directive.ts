import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlertSuccessTitle]',
})
export class AlertSuccessTitleDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} text-2xl font-bold text-core-primary text-center dark:text-core-primary-400 md:text-5xl`
    );
  }
}
