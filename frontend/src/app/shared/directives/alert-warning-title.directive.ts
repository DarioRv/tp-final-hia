import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlertWarningTitle]',
})
export class AlertWarningTitleDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} text-center text-yellow-700 text-2xl font-bold md:text-5xl dark:text-yellow-300`
    );
  }
}
