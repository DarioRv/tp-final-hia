import { Student } from '../../../app/courses/interfaces/student.interface';

export interface RegisterAttendanceResponse {
  asistencia: Attendance;
  message: string;
}

export interface Attendance {
  fecha: string;
  cursoId: string;
  horarioId: string;
  estudiante: Student;
}
