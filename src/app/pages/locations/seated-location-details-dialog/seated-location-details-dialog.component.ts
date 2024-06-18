import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {SeatedLocationDto} from "../../../dto/locations/seated-location-dto";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-seated-location-details-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgForOf
  ],
  templateUrl: './seated-location-details-dialog.component.html',
  styleUrl: './seated-location-details-dialog.component.scss'
})
export class SeatedLocationDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SeatedLocationDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SeatedLocationDto
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
