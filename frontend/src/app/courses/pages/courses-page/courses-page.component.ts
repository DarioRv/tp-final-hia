import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesDataService } from '../../services/courses-data.service';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { RequestStatus } from 'src/app/shared/types/request-status.type';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styles: [
    `
      .courses-list,
      .loading-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
      }
    `,
  ],
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public status: RequestStatus = 'pending';

  constructor(
    private coursesDataService: CoursesDataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  /**
   * Gets all courses for the current user
   */
  getAllCourses(): void {
    this.coursesDataService
      .getCourses(this.authService.currentUser()!.id)
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          this.status = 'success';
        },
        error: (error) => {
          if (error.status === 0) {
            this.status = 'fail';
            return;
          }

          this.status = 'error';
        },
      });
  }
}
