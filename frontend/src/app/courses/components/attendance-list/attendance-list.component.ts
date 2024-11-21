import { Component, Input, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'course-attendance-list',
  templateUrl: './attendance-list.component.html',
  styles: [],
})
export class AttendanceListComponent implements OnInit {
  @Input()
  courseId!: string;
  attendances: Array<Array<boolean | string>> = [];
  displayedColumns: string[] = ['fullName', 'status'];
  isLoading: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getStudentsAttendance();
  }

  /**
   * Gets the students attendance for a course
   */
  getStudentsAttendance(): void {
    this.isLoading = true;
    this.attendanceService.getStudentsAttendance(this.courseId).subscribe({
      next: (attendances) => {
        attendances.shift();
        this.attendances = attendances;
        this.isLoading = false;
      },
      error: () => {
        this.snackbarService.showSnackbar(
          'No se pudo obtener la lista de asistencias'
        );
        this.isLoading = false;
      },
    });
  }
}
