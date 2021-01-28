import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Location } from '@angular/common';
import { BlogService } from 'src/app/blog/blog.service';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit {

  form: FormGroup;
  id: number;
  returnUrl: string;
  user: {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private blogService: BlogService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    const name = this.user['firstname'] + this.user['lastname'] ;
    this.user = this.authService.user;
    this.form = this.formBuilder.group({
      author: [name, Validators.required],
      title: [null, Validators.required],
      publishdate: [Date.now(), Validators.required],
      content: [null, Validators.required],
      excert: [null, Validators.required],
      image: [null, Validators.required]
    });
  }

  add(formData: NgForm): void {
    console.log(formData);
    this.blogService.addBlog(formData).subscribe(() => this.location.back());
  }
}
