import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from 'src/app/blog/blog';
import { BlogService } from 'src/app/blog/blog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  blogs$: Observable<Blog[]>;

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.blogs$ = this.route.paramMap.pipe(
      switchMap(() => {
        return this.blogService.getBlogs();
      })
    );

  }

}
