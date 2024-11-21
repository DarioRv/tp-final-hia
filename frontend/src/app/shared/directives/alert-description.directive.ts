import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlertDescription]',
})
export class AlertDescriptionDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} text-center text-slate-700 dark:text-slate-300`
    );
  }
}
