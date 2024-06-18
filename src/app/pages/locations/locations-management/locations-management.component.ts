import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {NgIf, TitleCasePipe} from "@angular/common";
import {SeatedLocationDto} from "../../../dto/locations/seated-location-dto";
import {LocationsService} from "../../../services/locations.service";
import {Router} from "@angular/router";
import {MatBadge} from "@angular/material/badge";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {StandingLocationDto} from "../../../dto/locations/standing-location-dto";
import {MatDialog} from "@angular/material/dialog";
import {
  StandingLocationDetailsDialogComponent
} from "../standing-location-details-dialog/standing-location-details-dialog.component";
import {
  SeatedLocationDetailsDialogComponent
} from "../seated-location-details-dialog/seated-location-details-dialog.component";

@Component({
  selector: 'app-locations-management',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatFormField,
    MatIcon,
    MatButton,
    MatInput,
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TitleCasePipe,
    NgIf,
    MatHeaderCellDef,
    MatBadge,
    MatPaginator
  ],
  templateUrl: './locations-management.component.html',
  styleUrl: './locations-management.component.scss'
})
export class LocationsManagementComponent implements OnInit {

  searchStanding: string = '';
  searchSeated: string = '';

  seatedLocations: SeatedLocationDto[] = [];
  standingLocations: StandingLocationDto[] = [];

  displayedColumns: string[] = ['index', 'name', 'address', 'capacity', 'actions'];

  constructor(private locationService: LocationsService, protected router: Router, protected dialog: MatDialog) {
  }

  onSearchStandingChange(value: string) {
    this.searchStanding = value;
    this.loadStandingLocations();
  }

  onSearchSeatedChange(value: string) {
    this.searchSeated = value;
    this.loadSeatedLocations();
  }

  ngOnInit() {
    this.loadStandingLocations();
    this.loadSeatedLocations();
  }

  loadStandingLocations() {
    this.locationService.getStandingLocations(this.searchStanding).subscribe(
      (response: StandingLocationDto[]) => this.standingLocations = response
    );
  }

  loadSeatedLocations() {
    this.locationService.getSeatedLocations(this.searchSeated).subscribe(
      (response: SeatedLocationDto[]) => this.seatedLocations = response
    );
  }

  openStandingLocationDetails(location: StandingLocationDto) {
    this.dialog.open(StandingLocationDetailsDialogComponent, {
      width: '400px',
      data: location
    });
  }

  openSeatedLocationDetails(location: SeatedLocationDto) {
    this.dialog.open(SeatedLocationDetailsDialogComponent, {
      width: '400px',
      data: location
    });
  }
}
