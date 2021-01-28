import { Injectable } from '@angular/core';
import { MockHotel } from './mock-hotel';
import { of } from 'rxjs';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor() { }

  getHotels() {
    const hotels: Hotel[] = [];
    MockHotel.forEach(hotel => {
      hotels.push({
        id: hotel.id,
        name: hotel.name,
        img: hotel.img,
        stars: this.checkStars(hotel.stars),
        swimmingPool: hotel.swimmingPool === true ? 'Yes' : 'No',
        gymnesium: hotel.gymnesium === true ? 'Yes' : 'No',
        wifi: hotel.wifi === true ? 'Yes' : 'No',
        roomService: hotel.roomService === true ? 'Yes' : 'No',
        airCondition: hotel.airCondition === true ? 'Yes' : 'No',
        restaurant: hotel.restaurant === true ? 'Yes' : 'No',
        pricePerNight: hotel.pricePerNight});
      });
    return of(hotels);
  }

  checkStars(nb: number = 0) {
    const checkedList = [];
    for (let i = 0; i < 5; i++) {
      if (i < nb) {
        checkedList.push('checked');
      } else {
        checkedList.push('');
      }
    }
    return checkedList;
  }
}
