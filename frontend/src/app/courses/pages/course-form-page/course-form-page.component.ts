import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesDataService } from '../../services/courses-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from '../../interfaces/course.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CreateCourse } from '../../interfaces/create-course.interface';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styles: [
  ]
})
export class CourseFormPageComponent {
  courseForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    universityProgram: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    userId: new FormControl(this.authService.currentUser()!.id)
  });
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private courseService: CoursesDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.setMode();
  }

  /**
   * Checks if the form is in add mode
   * @returns true if the form is in add mode, false otherwise
   */
  isCreateMode(): boolean {
    return !this.router.url.includes('edit')
  }

  /**
   * Sets the mode of the form
   * If the url contains the word 'edit' then the form is in edit mode
   * If the url doesn't contain the word 'edit' then the form is in add mode
   */
  setMode() {
    if (this.isCreateMode()) return;

    this.setEditMode();
  }

  /**
   * Sets the form in edit mode
   */
  setEditMode() {
    this.editMode = true;
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.courseService.findCourseById(id) ),
    ).subscribe( course => {
      if (!course) {
        this.snackbarService.showSnackbar('El curso no existe');
        return this.router.navigateByUrl('/dashboard');
      }
      this.courseForm.reset({
        id: course.id,
        title: course.nombre,
        description: course.descripcion,
        universityProgram: course.carrera,
        userId: course.idUsuario
      });
      return;
    });
  }

  get id(): FormControl {
    return this.courseForm.get('id') as FormControl;
  }

  get title(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  get universityProgram(): FormControl {
    return this.courseForm.get('universityProgram') as FormControl;
  }

  get currentCourse(): Course {
    const course: Course = {
      id: this.id.value,
      nombre: this.title.value,
      descripcion: this.description.value,
      carrera: this.universityProgram.value,
      idUsuario: this.authService.currentUser()!.id
    };

    return course;
  }

  get currentCreateCourse(): CreateCourse {
    const course: CreateCourse = {
      nombre: this.title.value,
      descripcion: this.description.value,
      carrera: this.universityProgram.value,
      idUsuario: this.authService.currentUser()!.id
    };

    return course;
  }

  /**
   * Handle the form submit event
   * If the form is invalid, then the method returns
   * If the form is valid, then the method adds or updates the course
   * and navigates to the courses list page
   */
  onSubmit(): void {
    this.isLoading = true;
    if (this.courseForm.invalid) {
      this.isLoading = false;
      return;
    }

    if (this.isCreateMode()) {
      this.createCourse();
    } else {
      this.updateCourse();
    }
  }

  /**
   * Updates the course
   */
  updateCourse(): void {
    this.courseService.updateCourse(this.currentCourse).subscribe( () => {
      this.snackbarService.showSnackbar('¡El curso ha sido actualizado!');
      this.isLoading = false;
      this.router.navigateByUrl('dashboard/courses/list');
    });
  }

  /**
   * Creates the course
   */
  createCourse() {
    this.courseService.addCourse(this.currentCreateCourse).subscribe( () => {
      this.snackbarService.showSnackbar('¡El curso se ha creado!');
      this.isLoading = false;
      this.router.navigateByUrl('dashboard/courses/list');
    });
  }

  /**
   * Handle the form cancel event
   * Navigates to the courses list page
   */
  onCancel(): void {
    this.snackbarService.showSnackbar('Se ha cancelado la operación');
    this.router.navigateByUrl('/dashboard/courses/list');
  }
}
