import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ToastComponent} from "../pages/toast/toast.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showInfo(message: string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message, type: 'info' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  showSuccess(message: string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message, type: 'success' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showWarning(message: string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message, type: 'warning' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message, type: 'error' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
