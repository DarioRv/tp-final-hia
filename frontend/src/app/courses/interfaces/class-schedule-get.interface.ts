import { Dia } from './day.type';

export interface ClassScheduleGet {
  horarioId: string;
  entrada: string;
  salida: string;
  dia: Dia;
}
