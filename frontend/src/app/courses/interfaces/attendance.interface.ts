import { Student } from './student.interface';

export interface Attendance {
  cursoId: string;
  horarioId: string;
  fecha: string;
  estudiante: Student;
}
