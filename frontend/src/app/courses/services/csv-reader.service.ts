import { Injectable } from '@angular/core';
import { StudentPost } from '../interfaces/student-post.interface';

@Injectable({
  providedIn: 'root',
})
export class CsvReaderService {
  constructor() {}

  /**
   * Map the data from the csv file to a Student object
   * @param [lu, name, surname] array with the data from the csv file
   * @returns Student object
   */
  private mapDataToStudent([lu, name]: string[]): StudentPost {
    return {
      lu: lu,
      nombre: name,
    } as StudentPost;
  }

  /**
   * Get all the text lines from the csv file.
   * Remove the empty lines, the header and the lines with more than 3 columns
   * @param text text from the csv file
   * @returns array with all the text lines
   */
  private getAllTextLines(text: string): string[] {
    let lines = text.replace(/\r/g, '').split('\n');

    // skip empty lines
    lines = lines.filter((line) => line.length > 0);
    // skip header
    lines.shift();
    // skip lines with more than 3 columns
    lines = lines.filter((line) => line.split(',').length === 2);
    return lines;
  }

  /**
   * Parse the csv file and return an array with the data
   * @param text text from the csv file
   * @returns array with the data from the csv file
   */
  private parseCSV(text: string): string[][] {
    let lines = this.getAllTextLines(text);

    return lines.map((line) => {
      let rowValues = line.split(',');
      return rowValues;
    });
  }

  /**
   * Read the csv file and return an array of students
   * @param file csv file
   * @returns Promise that resolves to an array of students
   */
  async read(file: File): Promise<StudentPost[]> {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        let text = fileReader.result as string;
        let studentList = this.parseCSV(text).map(this.mapDataToStudent);
        resolve(studentList);
      };

      fileReader.onerror = () => {
        reject([]);
      };
    });
  }
}
