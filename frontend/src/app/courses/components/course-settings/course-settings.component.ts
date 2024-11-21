import { Component, Input } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'course-settings',
  templateUrl: './course-settings.component.html',
  styles: [],
  providers: [[MessageService]],
})
export class CourseSettingsComponent {
  @Input({ alias: 'courseData', required: true })
  course!: Course;

  constructor() {}

  disableAssistance(): boolean {
    return true;
  }
}
