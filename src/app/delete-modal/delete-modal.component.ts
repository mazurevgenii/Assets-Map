import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Truck} from '../shared/interfaces';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  @Input() truck: Truck;

  @Output() remove = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) {
  }
}
