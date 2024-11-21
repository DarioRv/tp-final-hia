import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Course } from '../.../../../../app/courses/interfaces/course.interface';
import { environment } from '../.../../../../environments/environment';
import { CoursesDataResponse } from '../.../../../../app/courses/interfaces/courses-data-response.interface';
import { RegisterAttendance } from '../interfaces/register-attendance.interface';
import {
  Attendance,
  RegisterAttendanceResponse,
} from '../interfaces/register-attendance-response.interface';
import { PlainAttendance } from '../interfaces/plain-attendance.interface';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  public baseUrl: string = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  /**
   * HTTP get request to find a course by attendance code
   * @param code attendance code to use for the search
   * @returns Observable of course or undefined if not found or error ocurred
   */
  findCourseByCode(code: string): Observable<Course> {
    return this.http
      .get<CoursesDataResponse>(
        `${this.baseUrl}/cursos/codigo-asistencia/${code}`
      )
      .pipe(
        map((resp) => resp.curso),
        catchError((err) => throwError(() => err))
      );
  }

  /**
   * Register the attendance of a student
   * @param attendance attendance to register
   */
  registerAttendance(attendance: RegisterAttendance): Observable<Attendance> {
    return this.http
      .post<RegisterAttendanceResponse>(
        `${this.baseUrl}/asistencias/registrar`,
        attendance
      )
      .pipe(
        map((resp) => resp.asistencia),
        catchError((err) => throwError(() => err))
      );
  }

  /**
   * Save attendance in the local storage
   */
  saveAttendance(attendance: PlainAttendance): void {
    const attendances: PlainAttendance[] = JSON.parse(
      localStorage.getItem('attendances') || '[]'
    );
    attendances.push(attendance);
    localStorage.setItem('attendances', JSON.stringify(attendances));
  }
}
