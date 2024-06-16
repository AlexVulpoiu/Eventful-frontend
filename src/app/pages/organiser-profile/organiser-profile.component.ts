import {Component, OnInit} from '@angular/core';
import {OrganiserProfileDto} from "../../dto/profile/organiser-profile-dto";
import {ProfileService} from "../../services/profile.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-organiser-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './organiser-profile.component.html',
  styleUrl: './organiser-profile.component.scss'
})
export class OrganiserProfileComponent implements OnInit {
  organiserProfileDto: OrganiserProfileDto | undefined;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getOrganiserProfile()
      .subscribe(data => this.organiserProfileDto = data);
  }
}
