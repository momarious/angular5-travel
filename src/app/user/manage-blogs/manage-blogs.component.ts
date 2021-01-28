import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog/blog.service';
import { Blog } from 'src/app/blog/blog';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.scss']
})
export class ManageBlogsComponent implements OnInit {

  blogs$: Blog[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => this.blogs$ = blogs);
  }

  delete(blog: Blog): void {
    this.blogs$ = this.blogs$.filter(h => h !== blog);
    this.blogService.deleteBlog(blog).subscribe();
  }

}
