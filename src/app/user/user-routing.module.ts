import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AuthGuard } from '../auth/auth.guard';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { UserComponent } from './user/user.component';
import { ManageUserAccountComponent } from './manage-user-account/manage-user-account.component';

const routes: Routes = [
  { path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'manage-blogs/post-blog', component: PostBlogComponent },
          { path: 'manage-blogs/edit-blog/:id', component: EditBlogComponent },
          { path: 'manage-blogs', component: ManageBlogsComponent },
          { path: 'manage-user-account', component: ManageUserAccountComponent },
          { path: '', component: UserDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

