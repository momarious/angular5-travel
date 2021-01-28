import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/package/package.service';
import { Package } from 'src/app/package/package';
import { Destination } from 'src/app/package/destination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  packages$: Observable<Package[]>;
  //destinations$: Observable<Destination[]>;
  carouselOptions: any = {};

  constructor(
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.packages$ = this.packageService.getPackages();
  //  this.destinations$ = this.packageService.getDestinations();
    this.carouselOptions = this.packageService.getPackageCarouselOptions();
  }
}
