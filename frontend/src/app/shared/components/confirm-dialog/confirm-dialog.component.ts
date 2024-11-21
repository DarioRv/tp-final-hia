import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: []
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  /**
   * Close the dialog with false value
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Close the dialog with true value
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
