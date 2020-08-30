import {Pipe, PipeTransform} from '@angular/core';
import {Truck} from './interfaces';

@Pipe({
  name: 'searchTrucks'
})
export class SearchPipe implements PipeTransform {
  transform(trucks: Truck[], searchStr = ''): Truck[] {
    if (!searchStr.trim()) {
      return trucks;
    }
    if (trucks.length <= 1) {
      return trucks;
    }

    return trucks.filter((truck: Truck) => {
      return truck.name.toLowerCase().includes(searchStr.toLowerCase());
    });
  }
}
