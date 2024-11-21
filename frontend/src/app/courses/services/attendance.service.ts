import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttendanceDataResponse } from '../interfaces/attendance-data-response.interface';
import * as moment from 'moment';
import { AttendanceHistoryResponse } from '../interfaces/attendance-history-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl: string = environment.API_URL;

  constructor(private htpp: HttpClient) {}

  /**
   * Gets the students attendance for a course
   * @param courseId the course id
   * @returns the students attendance
   */
  getStudentsAttendance(
    courseId: string
  ): Observable<Array<Array<boolean | string>>> {
    const url = `${this.baseUrl}/asistencias/obtenerAsistenciasPorCursoYPeriodo`;
    const params = {
      idCurso: courseId,
      fechaInicio: moment().format('DD/MM/YYYY'),
      fechaFin: moment().format('DD/MM/YYYY'),
    };

    return this.htpp.get<AttendanceDataResponse>(url, { params: params }).pipe(
      map(({ asistencias }) => asistencias),
      catchError((err) => throwError(() => err))
    );
  }

  downloadStudentsAttendance(courseId: string): Observable<Blob> {
    const url = `${this.baseUrl}/asistencias/obtenerAsistenciasPorCursoYPeriodo/excel`;
    const params = {
      idCurso: courseId,
      fechaInicio: moment().format('DD/MM/YYYY'),
      fechaFin: moment().format('DD/MM/YYYY'),
    };
    return this.htpp.request('get', url, { params, responseType: 'blob' }).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err))
    );
  }

  getAttendaceHistory(
    courseId: string,
    dateOne: string,
    dateTwo: string
  ): Observable<Array<string[]>> {
    const url = `${this.baseUrl}/asistencias/obtenerAsistenciasPorCursoYPeriodo`;
    const params = {
      idCurso: courseId,
      fechaInicio: moment(dateOne).format('DD/MM/YYYY'),
      fechaFin: moment(dateTwo).format('DD/MM/YYYY'),
    };

    return this.htpp
      .get<AttendanceHistoryResponse>(url, { params })
      .pipe(map((resp) => resp.asistencias));
  }

  downloadAttendaceHistory(
    courseId: string,
    dateOne: string,
    dateTwo: string
  ): Observable<Blob> {
    const url = `${this.baseUrl}/asistencias/obtenerAsistenciasPorCursoYPeriodo/excel`;
    const params = {
      idCurso: courseId,
      fechaInicio: moment(dateOne).format('DD/MM/YYYY'),
      fechaFin: moment(dateTwo).format('DD/MM/YYYY'),
    };

    return this.htpp.request('get', url, { params, responseType: 'blob' }).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err))
    );
  }
}
