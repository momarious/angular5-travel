import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from 'src/app/blog/blog-home/blog-home.component';
import { BlogSingleComponent } from 'src/app/blog/blog-single/blog-single.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogSearchComponent } from './blog-search/blog-search.component';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogSingleComponent,
    BlogSearchComponent
],
  imports: [
    NgxPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
