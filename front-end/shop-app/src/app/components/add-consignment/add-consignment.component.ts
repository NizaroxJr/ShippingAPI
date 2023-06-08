import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as actionTypes from '../../actions/types.action';

@Component({
  selector: 'app-add-consignment',
  templateUrl: './add-consignment.component.html',
  styleUrls: ['./add-consignment.component.css']
})
export class AddConsignmentComponent implements OnInit {
  @Input() add_clicked: boolean;
  @Output() cancelAdd: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();

  /**
   * FOR SIDE EFFECTS
   */
  // current action type
  current_actionType: string;

  // list of action types
  ADD_CONSIGNMENT_SUCCESS: string = actionTypes.ADD_CONSIGNMENT_SUCCESS;
  ADD_CONSIGNMENT_FAILURE: string = actionTypes.ADD_CONSIGNMENT_FAILURE;

  // Add Consignment Message
  addConsignment_successMsg: string;
  addConsignment_errorMsg: string;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('type')).subscribe(type => {
      this.current_actionType = type;
    })

    this.store.pipe(select('consignment')).subscribe(res => {
      this.addConsignment_successMsg = res.addConsignment_successMsg;
      this.addConsignment_errorMsg = res.addConsignment_errorMsg;
    })
  }

  onAdd(
    description: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    price: string,
    currency: string
  ) {
    this.addEvent.emit({
      description: description,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
      price: price,
      currency: currency
    });
  }

  onCancel() {
    this.cancelAdd.emit();
  }

}
