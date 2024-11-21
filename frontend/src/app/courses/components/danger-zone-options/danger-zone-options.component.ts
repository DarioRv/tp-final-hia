import { Component, Input } from '@angular/core';
import { CoursesDataService } from '../../services/courses-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'danger-zone-options',
  templateUrl: './danger-zone-options.component.html',
  styles: [
  ]
})
export class DangerZoneOptionsComponent {
  @Input({required: true}) courseId!: string;

  constructor(private coursesService: CoursesDataService, private snackbarService: SnackbarService, private router: Router, private dialog: MatDialog) { }

  /**
   * Method to delete the current course
   */
  onDeleteCourse() {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: '¿Esta seguro?',
          description: 'Se eliminará el curso',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }
      });
    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
      switchMap( () => this.coursesService.deleteCourseById(this.courseId)),
      filter(wasDeleted => wasDeleted)
    )
    .subscribe(() => {
      this.snackbarService.showSnackbar('Curso eliminado')
      this.router.navigate(['/dashboard/courses/list']);
    });
  }

  /**
   * Method to edit the current course, redirect to the edit page
   */
  onEditCourse() {
    this.router.navigate(['/dashboard/courses/edit', this.courseId]);
  }
}
