import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  showSnackbar(message: string, action?: string, duration?: number): void {
    this._snackbar.open(message, action ? action : 'Ok!', {
      duration: duration ? duration : 2500
    });
  }

}
