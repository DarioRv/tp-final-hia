import { ClassScheduleGet } from './class-schedule-get.interface';

export interface ScheduleDataResponse {
  horario: ClassScheduleGet;
  horarios: ClassScheduleGet[];
  message: string;
}
