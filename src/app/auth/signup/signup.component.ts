import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  alertMessage = '';
  userCreated = false;

  constructor(
    private formBuiler: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuiler.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  signup(formDta: NgForm) {
    return this.auth.signup(formDta).subscribe(
      user => {
        console.log(`${JSON.stringify(user)} created successfully`);
        this.userCreated = true;
        this.alertMessage = 'User created successfully ';
        //this.router.navigate(['login']);
    });
  }

}
