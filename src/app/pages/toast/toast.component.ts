import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {NgClass} from "@angular/common";
import {close} from "node:fs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {TablerIconsModule} from "angular-tabler-icons";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    TablerIconsModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  message: string;
  type: 'info' | 'success' | 'warning' | 'error';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBarRef: MatSnackBarRef<ToastComponent>) {
    this.message = data.message;
    this.type = data.type;
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
