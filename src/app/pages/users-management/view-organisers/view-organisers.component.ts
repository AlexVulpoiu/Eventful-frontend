import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {OrganiserProfileDto} from "../../../dto/profile/organiser-profile-dto";
import {OrganiserService} from "../../../services/organiser.service";
import {MatDialog} from "@angular/material/dialog";
import {OrganiserDetailsDialogComponent} from "../organiser-details-dialog/organiser-details-dialog.component";

@Component({
  selector: 'app-view-organisers',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatRow,
    MatRowDef,
    MatTab,
    MatTabGroup,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './view-organisers.component.html',
  styleUrl: './view-organisers.component.scss'
})
export class ViewOrganisersComponent {

  acceptedOrganisers: OrganiserProfileDto[] = [];
  pendingOrganisers: OrganiserProfileDto[] = [];
  rejectedOrganisers: OrganiserProfileDto[] = [];
  displayedColumns = ['index', 'name', 'email', 'actions'];

  constructor(private organiserService: OrganiserService, protected dialog: MatDialog) {
    this.organiserService.getOrganisers('ACCEPTED').subscribe(data => this.acceptedOrganisers = data);
    this.organiserService.getOrganisers('PENDING').subscribe(data => this.pendingOrganisers = data);
    this.organiserService.getOrganisers('REJECTED').subscribe(data => this.rejectedOrganisers = data);
  }

  openOrganiserDetailsDialog(organiser: OrganiserProfileDto) {
    this.dialog.open(OrganiserDetailsDialogComponent, {
      width: '1200px',
      data: organiser
    });
  }
}
