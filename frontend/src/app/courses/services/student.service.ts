import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { StudentPost } from '../interfaces/student-post.interface';
import { StudentDataResponse } from '../interfaces/student-data-response.interface';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = environment.API_URL;
  private _currentStudents$: BehaviorSubject<Student[]> = new BehaviorSubject<
    Student[]
  >([]);

  constructor(private htpp: HttpClient) {}

  get currentStudents$(): Observable<Student[]> {
    return this._currentStudents$.asObservable();
  }

  set currentStudents(students: Student[]) {
    this._currentStudents$.next(students);
  }

  /**
   * Clears the current students
   */
  clear(): void {
    this._currentStudents$.next([]);
  }

  /**
   * Gets the students for a course
   * @param courseId the course id
   * @returns the students
   */
  getStudents(courseId: string): Observable<Student[]> {
    const url = `${this.baseUrl}/estudiantes/curso/${courseId}`;
    return this.htpp.get<StudentDataResponse>(url).pipe(
      map(({ estudiantes }) => estudiantes),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Saves a student for a course
   * @param student the student
   */
  saveStudent(student: StudentPost): Observable<Student> {
    const url = `${this.baseUrl}/estudiantes`;
    return this.htpp.post<StudentDataResponse>(url, student).pipe(
      map(({ estudiante }) => estudiante),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Saves the students for a course
   * @param students the students
   */
  saveStudents(students: StudentPost[]): Observable<Student[]> {
    const url = `${this.baseUrl}/estudiantes/lista`;
    return this.htpp.post<StudentDataResponse>(url, students).pipe(
      map(({ estudiantes }) => estudiantes),
      tap((students) => (this.currentStudents = students)),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Gets a student by id
   * @param id the student id
   * @returns the student if found, throws an error otherwise
   */
  getStudentById(id: string): Observable<Student> {
    const url = `${this.baseUrl}/estudiantes/id/${id}`;
    return this.htpp.get<StudentDataResponse>(url).pipe(
      map(({ estudiante }) => estudiante),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Gets a student by lu
   * @param lu the student lu
   * @returns the student if found, throws an error otherwise
   */
  getStudentByLu(lu: string): Observable<Student> {
    const url = `${this.baseUrl}/estudiantes/lu/${lu}`;
    return this.htpp.get<StudentDataResponse>(url).pipe(
      map(({ estudiante }) => estudiante),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Gets a student by lu and course id
   * @param lu the student lu
   * @param courseId the course id
   * @returns the student if found, throws an error otherwise
   */
  getStudentByLuAndCourseId(lu: string, courseId: string): Observable<Student> {
    const url = `${this.baseUrl}/estudiantes/lu/${lu}?cursoId=${courseId}`;
    return this.htpp.get<StudentDataResponse>(url).pipe(
      map(({ estudiante }) => estudiante),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Deletes a student by id
   * @param id the student id
   * @returns true if the student was deleted, throws an error otherwise
   */
  deleteStudent(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/estudiantes/${id}`;
    return this.htpp.delete<StudentDataResponse>(url).pipe(
      map(() => true),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Deletes students by id
   * @param ids the students ids
   * @returns true if the students were deleted, throws an error otherwise
   */
  deleteStudents(ids: string[]): Observable<boolean> {
    const url = `${this.baseUrl}/estudiantes`;
    return this.htpp
      .request<StudentDataResponse>('delete', url, { body: ids })
      .pipe(
        map(({ success }) => success),
        catchError((error) => throwError(() => error))
      );
  }
}
