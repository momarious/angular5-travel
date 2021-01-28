import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog/blog.service';
import { Blog } from 'src/app/blog/blog';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss']
})
export class BlogSingleComponent implements OnInit {

  nextBlog$: Observable<Blog>;
  previousBlog$: Observable<Blog>;
  blog: Blog;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });

    const id = +this.route.snapshot.paramMap.get('id');
    
    this.blogService
      .getBlog(id)
      .subscribe(hero => this.blog = hero);

    this.previousBlog$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getPreviousBlog(+params.get('id')))
      );

    this.nextBlog$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getNextBlog(+params.get('id')))
    );
  }
}
