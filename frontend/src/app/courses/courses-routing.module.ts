import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseDetailsPageComponent } from './pages/course-details-page/course-details-page.component';
import { CourseFormPageComponent } from './pages/course-form-page/course-form-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: CoursesPageComponent,
    data: { title: 'Materias' },
    title: 'Materias | ASIST.IO',
  },
  {
    path: 'view/:id',
    component: CourseDetailsPageComponent,
    data: { title: 'Detalles de la materia' },
    title: 'Vista previa | ASIST.IO',
  },
  {
    path: 'new-course',
    component: CourseFormPageComponent,
    data: { title: 'Nueva materia' },
    title: 'Crear materia | ASIST.IO',
  },
  {
    path: 'edit/:id',
    component: CourseFormPageComponent,
    data: { title: 'Editar materia' },
    title: 'Editar materia | ASIST.IO',
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
