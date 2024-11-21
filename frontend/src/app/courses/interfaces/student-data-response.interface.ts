import { Student } from './student.interface';

export interface StudentDataResponse {
  estudiantes: Student[];
  estudiante: Student;
  success: boolean;
}
