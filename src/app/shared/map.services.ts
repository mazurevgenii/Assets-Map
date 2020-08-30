import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Truck} from './interfaces';

@Injectable({providedIn: 'root'})
export class MapServices {

  stream$: Subject<Truck> = new Subject<Truck>();

  showTruckOnMap(truck) {
    this.stream$.next(truck);
  }
}
