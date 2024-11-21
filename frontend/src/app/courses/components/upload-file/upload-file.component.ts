import { Component, Input } from '@angular/core';
import { CsvReaderService } from '../../services/csv-reader.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StudentService } from '../../services/student.service';
import { StudentPost } from '../../interfaces/student-post.interface';

@Component({
  selector: 'upload-csv-file',
  templateUrl: './upload-file.component.html',
  styles: [],
})
export class UploadFileComponent {
  acceptedFileType: string = '.csv';
  maxFileSize: number = 1_048_576; // 1MB
  errors: string[] = [];
  selectedFile?: File | null;
  @Input({ required: true })
  courseId!: string;

  constructor(
    private csvReader: CsvReaderService,
    private snackbarService: SnackbarService,
    private studentService: StudentService
  ) {}

  /**
   * Checks if the file extension is csv
   * @param file File to check
   * @returns true if the file extension is csv, false otherwise
   */
  checkFileExtension(file: File): boolean {
    const fileExtension: string = file.name.split('.').pop() || '';
    if (this.acceptedFileType.includes(fileExtension)) return true;

    this.errors.push(`El archivo ${file.name}  no es un archivo csv.`);
    return false;
  }

  /**
   * Checks if the file size is less than the max file size
   * @param file File to check
   * @returns true if the file size is less than the max file size, false otherwise
   */
  checkFileSize(file: File): boolean {
    if (file.size <= this.maxFileSize) return true;

    this.errors.push(
      `El archivo ${file.name} es demasiado grande (Límite 1MB).`
    );
    return false;
  }

  /**
   * Checks if the file is acceptable
   * @param file File to check
   * @returns true if the file is acceptable, false otherwise
   */
  isAnAcceptableFile(file: File): boolean {
    this.errors = [];
    return this.checkFileExtension(file) && this.checkFileSize(file);
  }

  /**
   * Method to handle the drop event
   * @param event FileList with the files dropped
   */
  onDropFile(event: FileList) {
    const file = event.item(0);

    if (!file) {
      this.snackbarService.showSnackbar('Hubo un error al subir el archivo.');
      return;
    }

    if (!this.isAnAcceptableFile(file)) return;

    this.selectedFile = file;
    this.snackbarService.showSnackbar('Se ha seleccionado el archivo.');
  }

  /**
   * Method to handle the file input event
   * @param event Event with the input element
   */
  onSelectFileFromBrowser(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);

    if (!file) {
      this.snackbarService.showSnackbar('Hubo un error al subir el archivo.');
      return;
    }

    if (!this.isAnAcceptableFile(file)) return;

    this.selectedFile = file;
    this.snackbarService.showSnackbar('Se ha seleccionado el archivo.');
  }

  /**
   * removes the selected file
   */
  onRemove() {
    this.selectedFile = undefined;
    this.snackbarService.showSnackbar('Se ha eliminado el archivo.');
  }

  /**
   * Method to handle the upload event, read the csv file and emit the student list
   */
  onUpload() {
    this.snackbarService.showSnackbar('Procesando el archivo csv...');
    this.csvReader
      .read(this.selectedFile!)
      .then((studentList) => {
        this.snackbarService.showSnackbar('Subiendo el archivo...');
        studentList = this.addCourseIdToStudentList(studentList);
        this.saveStudentList(studentList);
      })
      .catch((error) => {
        this.snackbarService.showSnackbar('Error al procesar el archivo csv.');
      });
    this.selectedFile = null;
  }

  /**
   * Save the student list
   */
  saveStudentList(studentList: StudentPost[]) {
    this.studentService.saveStudents(studentList).subscribe({
      next: () => {
        this.snackbarService.showSnackbar(
          'La lista de estudiantes se ha guardado correctamente.'
        );
      },
      error: (err) => {
        this.snackbarService.showSnackbar(
          'Error al guardar la lista de estudiantes.'
        );
      },
    });
  }

  /**
   * Add the courseId to the student list
   * @param studentList student list
   * @returns student list with the courseId added
   */
  addCourseIdToStudentList(studentList: StudentPost[]): StudentPost[] {
    return studentList.map(
      (student) =>
        ({
          ...student,
          cursoId: this.courseId,
        } as StudentPost)
    );
  }
}
