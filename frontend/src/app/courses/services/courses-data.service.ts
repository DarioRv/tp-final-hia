import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../interfaces/course.interface';
import { CreateCourse } from '../interfaces/create-course.interface';
import { CoursesDataResponse } from '../interfaces/courses-data-response.interface';
import { attendanceCodeResponse } from '../interfaces/attendance-code-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesDataService {
  private baseUrl: string = environment.API_URL;
  private _currentCourse: BehaviorSubject<Course | null> =
    new BehaviorSubject<Course | null>(null);
  public currentCourse$: Observable<Course | null> =
    this._currentCourse.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Set the current course
   * @param course course to set
   */
  setCurrentCourse(course: Course | null): void {
    this._currentCourse.next(course);
  }

  /**
   * Set the current course by id
   * @param id id of the course to set
   */
  setCurrentCourseById(id: string): void {
    this.findCourseById(id).subscribe((course) => {
      this._currentCourse.next(course);
    });
  }

  /**
   * HTTP get request to get all courses for a user
   * @returns Observable of courses array, throws error if there is no data
   */
  getCourses(userId: string): Observable<Course[]> {
    const url = `${this.baseUrl}/cursos/usuario/${userId}`;

    return this.http.get<CoursesDataResponse>(url).pipe(
      map(({ cursos }) => cursos),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * HTTP post request to add a new course
   * @param course course to add
   * @returns Observable of course created if successful, throws error if there is an error
   */
  addCourse(course: CreateCourse): Observable<Course> {
    const url = `${this.baseUrl}/cursos`;
    const body = course;

    return this.http
      .post<Course>(url, body)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * HTTP patch request to update a course
   * @param course course to update
   * @returns Observable of course or undefined
   */
  updateCourse(course: Course): Observable<Course> {
    const url = `${this.baseUrl}/cursos`;
    const body = course;

    return this.http.patch<CoursesDataResponse>(url, body).pipe(
      map(({ curso }) => curso),
      tap((curso) => this.setCurrentCourse(curso)),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * HTTP delete request to delete a course
   * @param id id of the course to delete
   * @returns Observable of true if the course was deleted, false otherwise
   */
  deleteCourseById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/cursos/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  /**
   * HTTP get request to find a course by id
   * @param id id of the course to find
   * @returns Observable of course or undefined
   */
  findCourseById(id: string): Observable<Course> {
    const url = `${this.baseUrl}/cursos/id/${id}`;

    return this.http.get<CoursesDataResponse>(url).pipe(
      map(({ curso }) => curso),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * HTTP get request to get courses suggestions for a search term
   * @param searchTerm search term to use
   * @returns Observable of courses array
   */
  getSuggestions(searchTerm: string, userId: string): Observable<Course[]> {
    const url = `${this.baseUrl}/cursos/termino/${searchTerm}`;

    const queryParams = {
      usuarioId: userId,
    };

    return this.http
      .get<CoursesDataResponse>(url, { params: queryParams })
      .pipe(
        map(({ cursos }) => cursos),
        catchError((err) => throwError(() => err))
      );
  }

  /**
   * HTTP get request to generate a new attendance code for a course
   * @param courseId id of the course to generate the code for
   * @returns Observable of the new attendance code
   */
  findCourseByAttendanceCode(attendanceCode: string): Observable<Course> {
    const url = `${this.baseUrl}/cursos/codigo-asistencia/${attendanceCode}`;

    return this.http
      .get<Course>(url)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * HTTP get request to generate a new attendance code
   * @returns Observable of the new attendance code
   */
  generateAttendanceCode(): Observable<string> {
    const url = `${this.baseUrl}/cursos/codigo-asistencia`;

    return this.http.get<attendanceCodeResponse>(url).pipe(
      map(({ codigoAsistencia }) => codigoAsistencia),
      catchError((err) => throwError(() => err))
    );
  }
}
