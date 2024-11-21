import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlertTitle]',
})
export class AlertTitleDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} text-center text-slate-700 text-2xl font-bold md:text-5xl dark:text-slate-300`
    );
  }
}
