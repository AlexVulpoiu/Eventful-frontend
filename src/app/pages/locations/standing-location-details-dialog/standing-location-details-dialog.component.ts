import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

export interface StandingLocationDto {
  name: string;
  city: string;
  country: string;
  address: string;
  capacity: number;
}

@Component({
  selector: 'app-standing-location-details-dialog',
  templateUrl: './standing-location-details-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  styleUrls: ['./standing-location-details-dialog.component.scss']
})
export class StandingLocationDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StandingLocationDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StandingLocationDto
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
