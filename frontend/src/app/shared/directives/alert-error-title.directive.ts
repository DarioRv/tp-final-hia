import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlertErrorTitle]',
})
export class AlertErrorTitleDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} text-2xl font-bold text-red-600 text-center dark:text-red-400 md:text-5xl`
    );
  }
}
