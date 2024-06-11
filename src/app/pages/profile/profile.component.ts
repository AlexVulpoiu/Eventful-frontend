import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {formatDate, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ProfileService} from "../../services/profile.service";
import {ProfileDto} from "../../dto/profile/profile-dto";
import {OrderDetails} from "../../dto/orders/order-details-dto";
import {OrderProfileDetails} from "../../dto/orders/order-profile-details-dto";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
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
    MatHeaderCellDef,
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'status', 'orderDate', 'eventName', 'total', 'tickets'];
  profileDetails: ProfileDto | undefined;
  orders: OrderProfileDetails[] = [];

  constructor(private profileService: ProfileService,
              @Inject(LOCALE_ID) public locale: string) {

  }

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe(data => {
      this.profileDetails = data;
      this.orders = data.orders;
    });
  }

  protected readonly formatDate = formatDate;
}
