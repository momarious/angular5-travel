import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.setMessage();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
    this.router.navigate([redirect]);
  }

}
