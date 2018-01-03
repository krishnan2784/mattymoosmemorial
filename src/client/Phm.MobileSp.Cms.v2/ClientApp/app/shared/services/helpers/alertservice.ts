import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";


@Injectable()
export class AlertService {
  constructor(public snackbar: MatSnackBar) { }
  public displayAlert(message, additionalClasses = [], duration = 5000) {
    this.snackbar.open(message, 'X', {
      duration: duration,
      extraClasses: additionalClasses,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  public displaySuccessFailAlert(message, success) {
    this.snackbar.open(message, 'X', {
      duration: 5000,
      extraClasses: [(success ? "green" : "red")],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
