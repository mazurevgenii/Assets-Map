import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {AssetServices} from '../shared/asset.services';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {AddNewModalComponent} from '../add-new-modal/add-new-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MapServices} from '../shared/map.services';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, OnDestroy {
  searchStr = '';
  tSub: Subscription;
  rSub: Subscription;

  constructor(
    public assetServices: AssetServices,
    private mapServices: MapServices,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal,
  ) {
  }

  showTruckOnMap(truck) {
    this.mapServices.showTruckOnMap(truck);
  }

  openDeleteModel(truck) {
    const modalRef = this.modalService.open(DeleteModalComponent, {centered: true});
    modalRef.componentInstance.truck = truck;
    modalRef.componentInstance.remove.subscribe(() => {
      this.remove(truck.id);
    });
  }

  openAddNewModal() {
    this.modalService.open(AddNewModalComponent);
  }

  ngOnInit() {
    this.tSub = this.assetServices.getAll().subscribe(trucks => {
      this.assetServices.trucks = trucks;
    });
  }

  ngOnDestroy() {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.rSub = this.assetServices.remove(id)
      .subscribe(() => {
        this.assetServices.trucks = this.assetServices.trucks.filter(truck => truck.id !== id);
      });
  }
}
