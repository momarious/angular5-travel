import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FooterComponent } from './includes/footer/footer.component';
import { HeaderComponent } from './includes/header/header.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HotelComponent } from './hotel/hotel/hotel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PackageComponent } from './package/package/package.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    HotelComponent,
    PageNotFoundComponent,
    PackageComponent,
    HomeComponent,
  ],
  imports: [
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    BlogModule,
    BrowserModule,
    OwlModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
