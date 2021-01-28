import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/package/package';
import { PackageService } from 'src/app/package/package.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  packages$: Observable<Package[]>;
  packagesCarouselOptions: any = {};

  constructor(
    private packageService: PackageService
    ) {}

  ngOnInit() {
    this.packages$ = this.packageService.getPackages();
    this.packagesCarouselOptions = this.packageService.getPackageCarouselOptions();
  }

}
