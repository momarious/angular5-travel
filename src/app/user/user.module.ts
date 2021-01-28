import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { UserComponent } from './user/user.component';
import { ManageUserAccountComponent } from './manage-user-account/manage-user-account.component';

@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    ManageUserAccountComponent,
    ManageBlogsComponent,
    EditBlogComponent,
    PostBlogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
