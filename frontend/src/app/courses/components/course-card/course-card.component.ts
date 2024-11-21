import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesDataService } from '../../services/courses-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'dashboard-course-card',
  templateUrl: './course-card.component.html',
  styles: [
  ]
})
export class CourseCardComponent {

  @Input({required: true})
  public course!: Course;
  public studentsMap = {
    '=0': 'Sin estudiantes',
    '=1': '1 estudiante',
    'other': '# estudiantes'
  }

  constructor(private courseService: CoursesDataService, private snackbarService: SnackbarService, private router: Router, private dialog: MatDialog) {}

  /**
   * Delete the selected course before a confirmation dialog
   * @param id course id to delete
   */
  onDeleteCourse(id: string): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: '¿Esta seguro?',
          description: `Esta a punto de eliminar el curso ${this.course.nombre}`,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }
      });
    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
      switchMap( () => this.courseService.deleteCourseById(id)),
      filter(wasDeleted => wasDeleted)
    )
    .subscribe(() => {
      this.snackbarService.showSnackbar('Curso eliminado')
      this.redirectTo('dashboard/courses/list')
    });
  }

  /**
   * Redirect to the given uri
   * @param uri uri to redirect
   */
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
 }
}
