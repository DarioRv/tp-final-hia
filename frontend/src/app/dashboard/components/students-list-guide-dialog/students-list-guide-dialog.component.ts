import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'students-list-guide-dialog',
  templateUrl: './students-list-guide-dialog.component.html',
  styles: [],
})
export class StudentsListGuideDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentsListGuideDialogComponent>
  ) {}
}
