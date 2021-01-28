import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuiler: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuiler.group({
      name: [null, Validators.required],
      address: [null, [Validators.required, Validators.email]],
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  contact(formData: NgForm) {
      console.log(formData);
  }
}
