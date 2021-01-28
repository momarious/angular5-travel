import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService } from 'src/app/blog/blog.service';
import { Blog } from 'src/app/blog/blog';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  @Input() blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
      .subscribe(blog => this.blog = blog);
  }

  save(): void {
    this.blogService.updateBlog(this.blog)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
