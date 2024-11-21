import { Course } from "./course.interface";

export interface CoursesDataResponse {
  cursos: Course[];
  curso: Course;
  success: boolean;
}
