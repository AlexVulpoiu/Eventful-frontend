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
import {MatIconModule} from '@angular/material/icon';
import {NgIf, TitleCasePipe} from "@angular/common";
import {productsData} from "../../dashboard/dashboard.component";
import {SeatedLocationDto} from "../../../dto/locations/seated-location-dto";
import {LocationsService} from "../../../services/locations.service";
import {Router} from "@angular/router";
import {MatBadge} from "@angular/material/badge";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {StandingLocationDto} from "../../../dto/locations/standing-location-dto";

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

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  hidePageSize = false;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.seatedLocations = this.seatedLocations.reverse();
  }

  search: string = '';
  seatedLocations: SeatedLocationDto[] = [];
  standingLocations: StandingLocationDto[] = [];

  displayedColumns: string[] = ['index', 'name', 'address', 'capacity', 'actions'];

  constructor(private locationService: LocationsService, protected router: Router) {
  }

  ngOnInit() {
    this.locationService.getSeatedLocations().subscribe(
      (response: SeatedLocationDto[]) => this.seatedLocations = response
    );

    this.locationService.getStandingLocations().subscribe(
      (response: StandingLocationDto[]) => this.standingLocations = response
    );

  }
}
