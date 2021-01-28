import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;
  form: FormGroup;
  returnUrl: string;
  alertMessage = '';

  constructor(
    private formBuiler: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuiler.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  login(formData: NgForm) {
    console.log('Trying to log in ...');
    return this.authService.login(formData)
      .subscribe(() => {
        if (this.authService.isLoggedIn) {

          // Get the redirect URL from our authService service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user';


          // Set our navigation extras object
          // that passes on our global query params and fragment
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        } else {
          this.alertMessage = this.authService.alertMessage;
        }
        
      });
  }

}
