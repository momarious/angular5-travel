import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  sessionId: Observable<string>;
  token: Observable<string>;
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }


  ngOnInit() {

    // Capture the session ID if available
    this.sessionId = this.route
    .queryParamMap
    .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    this.user = this.authService.user;
    //console.log(this.user);
  }


}
