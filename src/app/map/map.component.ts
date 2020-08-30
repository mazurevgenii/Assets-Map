import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MapServices} from '../shared/map.services';
// @ts-ignore
import mapStyles from '../shared/json/map-style.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;

  lat = 40.73061;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 13,
    disableDefaultUI: true,
    styles: mapStyles
  };

  sub: Subscription;

  constructor(private mapServices: MapServices) {
  }

  ngOnInit(): void {
    this.sub = this.mapServices.stream$.subscribe(truck => {
        this.setCenter(truck);
      }
    );
  }

  setCenter(truck) {
    this.marker.setPosition(new google.maps.LatLng(truck.latitude, truck.longitude));
    this.marker.setTitle(truck.name);
    this.map.setCenter(new google.maps.LatLng(truck.latitude, truck.longitude));
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker = new google.maps.Marker({map: this.map});
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
