import {Component, OnInit} from '@angular/core';
import {OrganiserProfileDto} from "../../dto/profile/organiser-profile-dto";
import {ProfileService} from "../../services/profile.service";
import {NgIf} from "@angular/common";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

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
  roles: string[] = [];

  constructor(private profileService: ProfileService, private tokenStorageService: TokenStorageService,
              private router: Router, private notificationService: NotificationService) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('ORGANISER')) {
      if (this.roles.length === 0 || this.roles.includes('USER')) {
        this.router.navigate(['/events/all']);
      } else {
        this.router.navigate(['/events']);
      }
    }
  }

  ngOnInit() {
    this.profileService.getOrganiserProfile()
      .subscribe({
        next: data => {
          this.organiserProfileDto = data;
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            if (this.roles.includes('ORGANISER')) {
              this.router.navigate(['/events/all']);
            } else {
              this.router.navigate(['/events']);
            }
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
  }
}
