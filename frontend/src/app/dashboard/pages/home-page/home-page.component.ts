import { Component } from '@angular/core';
import { GettingStartedGuideDialogComponent } from '../../components/getting-started-guide-dialog/getting-started-guide-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceGuideDialogComponent } from '../../components/attendance-guide-dialog/attendance-guide-dialog.component';
import { StudentsListGuideDialogComponent } from '../../components/students-list-guide-dialog/students-list-guide-dialog.component';

@Component({
  selector: 'dashboard-home-page',
  templateUrl: './home-page.component.html',
  styles: [
    `
      .guias {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
      }

      .guia {
        cursor: pointer;
        border: 1px solid transparent;
      }

      .guia p {
        text-wrap: balance;
        text-align: center;
      }

      .guia:hover {
        border: 1px solid #5457cd;
      }
    `,
  ],
})
export class HomePageComponent {
  public introduction: boolean = false;
  public students: boolean = false;
  public attendance: boolean = false;

  constructor(public dialog: MatDialog) {}

  openGetStarted() {
    this.dialog.open(GettingStartedGuideDialogComponent, {
      width: '80%',
    });
  }

  openAttendance() {
    this.dialog.open(AttendanceGuideDialogComponent, {
      width: '80%',
    });
  }

  openStudents() {
    this.dialog.open(StudentsListGuideDialogComponent, {
      width: '80%',
    });
  }
}
