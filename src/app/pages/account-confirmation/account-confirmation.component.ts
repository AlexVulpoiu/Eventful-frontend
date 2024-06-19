import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-account-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.scss'
})
export class AccountConfirmationComponent implements OnInit {
  code: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');

    this.authService.confirmAccount(this.code!)
      .subscribe(() => this.router.navigate(['/authentication/login']));
  }
}
