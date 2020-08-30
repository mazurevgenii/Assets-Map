import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../shared/interfaces';
import {AssetServices} from '../shared/asset.services';
import {tap} from 'rxjs/operators';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new-modal.component.html',
  styleUrls: ['./add-new-modal.component.css']
})
export class AddNewModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private assetService: AssetServices,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      latitude: new FormControl(null, [
        Validators.required,
        Validators.min(-90),
        Validators.max(90),
        Validators.pattern('^\\-?((\\d+)?[0-9](\\.\\d+)?|90(.[0]+)?)$')
      ]),
      longitude: new FormControl(null, [
        Validators.required,
        Validators.min(-180),
        Validators.max(180),
        Validators.pattern('^\\-?((\\d+)?[0-9](\\.\\d+)?|180((.[0]+)?))$'),
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const truck: Truck = {
      name: this.form.value.name,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
    };

    this.assetService.create(truck)
      .pipe(
        tap(() => {
          this.assetService.getAll()
            .subscribe((trucks: Truck[]) => {
              this.assetService.trucks = trucks;
            });
        })
      )
      .subscribe(() => {
        this.form.reset();
      });
  }
}
