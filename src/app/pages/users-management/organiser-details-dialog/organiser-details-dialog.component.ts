import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {OrganiserProfileDto} from "../../../dto/profile/organiser-profile-dto";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {OrganiserService} from "../../../services/organiser.service";

@Component({
  selector: 'app-organiser-details-dialog',
  standalone: true,
  imports: [
    NgIf,
    MatDialogContent,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './organiser-details-dialog.component.html',
  styleUrl: './organiser-details-dialog.component.scss'
})
export class OrganiserDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrganiserDetailsDialogComponent>,
              private organiserService: OrganiserService,
              @Inject(MAT_DIALOG_DATA) public data: OrganiserProfileDto) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onApprove(data: OrganiserProfileDto) {
    this.organiserService.updateOrganiserStatus(data.id, 'ACCEPTED')
      .subscribe(() => {
        this.dialogRef.close();
        window.location.reload();
      });
  }

  onReject(data: OrganiserProfileDto) {
    this.organiserService.updateOrganiserStatus(data.id, 'REJECTED')
      .subscribe(() => {
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
