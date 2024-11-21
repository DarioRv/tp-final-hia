import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassSchedule } from '../interfaces/class-schedule.interface';
import { ScheduleDataResponse } from '../interfaces/schedule-data-response.interface';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { ClassScheduleGet } from '../interfaces/class-schedule-get.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService {
  private baseUrl = `${environment.API_URL}/horarios`;
  private _currentClassSchedules$: BehaviorSubject<ClassScheduleGet[] | null> =
    new BehaviorSubject<ClassScheduleGet[] | null>(null);
  private _currentCourseId: string = '';

  constructor(private http: HttpClient) {}

  set currentCourseId(courseId: string) {
    this._currentCourseId = courseId;
  }

  get currentClassSchedules$(): Observable<ClassScheduleGet[] | null> {
    return this._currentClassSchedules$.asObservable();
  }

  set currentClassSchedules(classSchedules: ClassScheduleGet[] | null) {
    this._currentClassSchedules$.next(classSchedules);
  }

  /**
   * Clears the current class schedules and course id
   */
  clear(): void {
    this._currentClassSchedules$.next(null);
    this._currentCourseId = '';
  }

  /**
   * Updates the current class schedule
   * @param courseId The course id
   */
  updateCurrentClassSchedules(): void {
    this.getClassSchedulesByCourseId(this._currentCourseId)
      .pipe(
        tap((schedules) => {
          this.currentClassSchedules = schedules;
        })
      )
      .subscribe();
  }

  /**
   * Add a new class schedule
   * @param classSchedule The class schedule to be added
   * @returns The added class schedule
   */
  addClassSchedule(classSchedule: ClassSchedule): Observable<ClassScheduleGet> {
    const url = `${this.baseUrl}/registrar`;

    return this.http.post<ScheduleDataResponse>(url, classSchedule).pipe(
      map(({ horario }) => horario),
      tap((horario) => {
        this.updateCurrentClassSchedules();
      }),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * Updates a existing class schedule
   * @param classScheduleId The class schedule id
   * @returns The updated class schedule
   */
  deleteClassSchedule(classScheduleId: string): Observable<boolean> {
    const url = `${this.baseUrl}/eliminar/${classScheduleId}`;

    return this.http.delete<ScheduleDataResponse>(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Gets all class schedules by course id
   * @param courseId The course id
   * @returns The class schedules
   */
  getClassSchedulesByCourseId(
    courseId: string
  ): Observable<ClassScheduleGet[]> {
    const url = `${this.baseUrl}/obtenerHorarios/${courseId}`;

    return this.http.get<ScheduleDataResponse>(url).pipe(
      map(({ horarios }) => horarios),
      catchError(() => of([]))
    );
  }

  /**
   * Gets a class schedule by id
   * @param classScheduleId The class schedule id
   * @returns The class schedule obtained by id
   */
  getClassScheduleById(classScheduleId: string): Observable<ClassScheduleGet> {
    const url = `${this.baseUrl}/obtenerHorario/${classScheduleId}`;

    return this.http.get<ScheduleDataResponse>(url).pipe(
      map(({ horario }) => horario),
      catchError((err) => throwError(() => err))
    );
  }
}
