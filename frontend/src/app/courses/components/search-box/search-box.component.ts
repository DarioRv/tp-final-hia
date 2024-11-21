import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesDataService } from '../../services/courses-data.service';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { RequestStatus } from 'src/app/shared/types/request-status.type';

@Component({
  selector: 'course-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  public suggestedCourses: Course[] = [];
  public searchInput = new FormControl('');
  public status: RequestStatus = 'no status';

  constructor(
    private coursesDataService: CoursesDataService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.startDebouncer();
  }

  /**
   * Method to get the course suggestions for the search term
   * @param searchTerm The term to search for
   */
  searchCourse(searchTerm: string): void {
    this.coursesDataService
      .getSuggestions(searchTerm, this.authService.currentUser()!.id)
      .subscribe({
        next: (courses) => {
          this.suggestedCourses = courses;
          this.status = 'success';
        },
        error: () => {
          this.suggestedCourses = [];
          this.status = 'no content';
        },
      });
  }

  /**
   * Method to navigate to the selected course
   * @param event The event that contains the selected option
   */
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      return;
    }

    const course: Course = event.option.value;
    this.searchInput.setValue(course.nombre);
    this.router.navigate(['/dashboard/courses/view', course.id]);
  }

  /**
   * Method to start the debouncer
   * This method will start the debouncer to wait for the user to stop typing
   * before making the request to the server
   */
  startDebouncer(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(1500))
      .subscribe((value) => {
        this.searchCourse(value);
      });
  }

  /**
   * Method to handle the key up event
   * @param searchTerm The term to search
   */
  onKeyUp(searchTerm: string): void {
    if (searchTerm === '') return;
    this.debouncer.next(searchTerm);
    this.suggestedCourses = [];
    this.status = 'pending';
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
}
