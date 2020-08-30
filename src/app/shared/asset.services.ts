import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbResponse, Truck} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AssetServices {
  trucks: Truck[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  create(truck: Truck): Observable<Truck> {
    return this.http.post<Truck>(`${environment.FbDbUrl}assets.json`, truck)
      .pipe(
        map((response: FbResponse) => {
          return {
            ...truck,
            id: response.name
          };
        })
      );
  }

  getAll(): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${environment.FbDbUrl}assets.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
            }));
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.FbDbUrl}assets/${id}.json`);
  }
}
