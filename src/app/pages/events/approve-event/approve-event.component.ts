import {Component, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {EventApproveService} from "../../../services/event-approve.service";
import {EventService} from "../../../services/event.service";
import {ChangeEventStatusDto} from "../../../dto/events/change-event-status-dto";

@Component({
  selector: 'app-approve-event',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './approve-event.component.html',
  styleUrl: './approve-event.component.scss'
})
export class ApproveEventComponent implements OnInit {

  eventId: number = 0;

  constructor(public dialogRef: MatDialogRef<ApproveEventComponent>, private eventApproveService: EventApproveService,
              private eventService: EventService) {

  }

  ngOnInit() {
    this.eventApproveService.getMessage.subscribe(data => this.eventId = data.eventId);
  }

  onApprove(): void {
    this.eventService.updateEventStatus(this.eventId, new ChangeEventStatusDto('ACCEPTED', ''))
      .subscribe(data => console.log(data));
    this.dialogRef.close(true);
  }
}
