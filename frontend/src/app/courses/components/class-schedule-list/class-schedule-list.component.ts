import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClassScheduleService } from '../../services/class-schedule.service';
import { ClassScheduleGet } from '../../interfaces/class-schedule-get.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'class-schedule-list',
  templateUrl: './class-schedule-list.component.html',
  styles: [],
})
export class ClassScheduleListComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  courseId!: string;
  schedules: ClassScheduleGet[] = [];
  subscription$: Subscription = new Subscription();

  constructor(
    private scheduleService: ClassScheduleService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.scheduleService.currentCourseId = this.courseId;
    this.getSchedules();
    this.subscribeToClassScheduleUpdates();
  }

  /**
   * Gets the class schedules
   */
  getSchedules(): void {
    this.scheduleService.getClassSchedulesByCourseId(this.courseId).subscribe({
      next: (schedules) => {
        this.schedules = schedules;
      },
      error: () => {
        this.snackbarService.showSnackbar('Los horarios no están disponibles');
      },
    });
  }

  /**
   * Deletes a class schedule
   * @param scheduleId The schedule id
   */
  deleteSchedule(scheduleId: string): void {
    this.scheduleService.deleteClassSchedule(scheduleId).subscribe({
      next: (hasDeleted) => {
        if (!hasDeleted) {
          this.snackbarService.showSnackbar('No se pudo eliminar el horario');
          return;
        }
        this.getSchedules();
        this.snackbarService.showSnackbar('Horario eliminado correctamente');
      },
      error: () => {
        this.snackbarService.showSnackbar('No se pudo eliminar el horario');
      },
    });
  }

  /**
   * Subscribes to the class schedule updates
   */
  subscribeToClassScheduleUpdates(): void {
    this.subscription$ = this.scheduleService.currentClassSchedules$.subscribe(
      (schedules) => {
        if (!schedules) return;

        this.schedules = schedules;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.scheduleService.clear();
  }
}
