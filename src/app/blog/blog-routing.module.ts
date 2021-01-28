import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogHomeComponent } from 'src/app/blog/blog-home/blog-home.component';
import { BlogSingleComponent } from 'src/app/blog/blog-single/blog-single.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';

const routes: Routes = [
  { path: 'blog-home', component: BlogHomeComponent },
  { path: 'blog-search', component: BlogSearchComponent },
  { path: 'blog-single/:id', component: BlogSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
