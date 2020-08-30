import {Pipe, PipeTransform} from '@angular/core';
import {Truck} from './interfaces';

@Pipe({
  name: 'sortByName'
})
export class SortPipe implements PipeTransform {
  transform(trucks: Truck[]): Truck[] {
    if (trucks.length <= 1) {
      return trucks;
    }
    return trucks.sort((a: Truck, b: Truck) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
  }
}
