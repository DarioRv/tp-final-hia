import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../../courses/interfaces/course.interface';
import { AttendanceService } from '../../services/attendance.service';
import { ClassScheduleService } from '../../../courses/services/class-schedule.service';
import { ClassScheduleGet } from '../../../../app/courses/interfaces/class-schedule-get.interface';
import { SnackbarService } from '../../../../app/shared/services/snackbar.service';

import * as moment from 'moment';

@Component({
  selector: 'register-attendance-page',
  templateUrl: './register-attendance-page.component.html',
  styles: [],
})
export class RegisterAttendancePageComponent implements OnInit {
  course: Course | undefined = undefined;
  currentSchedule: ClassScheduleGet | undefined = undefined;
  isOutsideSchedule: boolean = false;
  noSchedulesFound: boolean = false;
  isLoading: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private classScheduleService: ClassScheduleService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ attendanceCode }) => {
      this.getCourseByCode(attendanceCode);
    });
  }

  getCourseByCode(attendanceCode: string): void {
    this.isLoading = true;
    this.attendanceService.findCourseByCode(attendanceCode).subscribe({
      next: (course) => {
        this.course = course;
        this.isLoading = false;
        this.getCurrentSchedule(course.id);
      },
      error: (err) => {
        this.snackbarService.showSnackbar('No se ha encontrado la materia');
        this.isLoading = false;
      },
    });
  }

  getCurrentSchedule(courseId: string): void {
    if (this.course) {
      this.classScheduleService
        .getClassSchedulesByCourseId(courseId)
        .subscribe({
          next: (schedules) => {
            if (schedules.length == 0) {
              this.noSchedulesFound = true;
              return;
            }

            const today = this.removeAccents(
              moment().locale('es-AR').format('dddd').toUpperCase()
            );
            this.currentSchedule = this.findTodaySchedule(today, schedules);

            if (!this.currentSchedule) {
              this.isOutsideSchedule = true;
              return;
            }
          },
          error: (err) => {
            this.snackbarService.showSnackbar(
              'No ha sido posible cargar los horarios de la materia'
            );
          },
        });
    }
  }

  removeAccents(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  findTodaySchedule(
    today: string,
    schedules: ClassScheduleGet[]
  ): ClassScheduleGet | undefined {
    return schedules.find((schedule) => {
      return (
        schedule.dia == today &&
        moment().isBetween(
          moment(schedule.entrada, 'HH:mm'),
          moment(schedule.salida, 'HH:mm')
        )
      );
    });
  }
}
