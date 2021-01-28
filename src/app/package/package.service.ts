import { Injectable } from '@angular/core';
import { MockPackage } from 'src/app/package/mock-package';
import { Package } from 'src/app/package/package';
import { Observable, of } from 'rxjs';
import { Destination } from 'src/app/package/destination';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor() { }

  getPackages(): Observable<Package[]> {
    return of(MockPackage);
  }

  /*getDestinations(): Observable<Destination[]> {
    return of(MockDestination);
  }*/

  getPackageCarouselOptions() {
    return {
      items: 1,
      loop: true,
      margin: 30,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        768: { items: 1 },
        961: { items: 1 }
      },
      nav: true
    };
  }
}
