import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/blog/blog';
import { Package } from 'src/app/package/package';
import { Destination } from 'src/app/package/destination';
import { BlogService } from 'src/app/blog/blog.service';
import { Observable } from 'rxjs';
import { PackageService } from 'src/app/package/package.service';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destinations$: Destination[];
  packages$: Package[];
  options: any = {};

  posts: Blog[];
  blogs$: Observable<Blog[]>;

  constructor(
    private homeService: HomeService,
    private packageService: PackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.packageService
      .getPackages()
      .subscribe(arg => this.packages$ = arg);

    this.blogs$ = this.route.paramMap.pipe(
        switchMap(() => {
          return this.homeService.getBlogs();
        })
    );

    this.options = {
      items: 1,
      margin: 30,
      navSpeed: 700,
      responsive: {
        480: { items: 1 },
        768: { items: 2 },
        961: { items: 3 }
      },
      nav: false,
      navigation: false
    };

  }

  getPosts(): void {
    this.homeService
      .getPosts()
      .subscribe(arg => this.posts = arg);
  }

}
