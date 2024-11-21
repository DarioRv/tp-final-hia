import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[asistAlert]',
})
export class AlertDirective {
  constructor(private element: ElementRef) {
    const classes = this.element.nativeElement.getAttribute('class') || '';
    this.element.nativeElement.setAttribute(
      'class',
      `${classes} w-fit bg-slate-200 p-4 rounded dark:bg-slate-700`
    );
  }
}
