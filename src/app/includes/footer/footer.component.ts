import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuiler: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuiler.group({
      email: [null, [Validators.required, Validators.email]]
     });
  }

  subscribe(formData: NgForm) {
    console.log(formData);
  }
}
