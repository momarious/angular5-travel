import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { User } from '../user';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-user-account',
  templateUrl: './manage-user-account.component.html',
  styleUrls: ['./manage-user-account.component.scss']
})
export class ManageUserAccountComponent implements OnInit {

  @Input() user: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
