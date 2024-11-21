/**
 * Represents a plain attendance of a student in a course.
 * Use this interface to represent the attendance that is going to
 *  be displayed in the attendance list and saved in the local storage.
 */
export interface PlainAttendance {
  lu: string;
  courseName: string;
  date: string;
}
