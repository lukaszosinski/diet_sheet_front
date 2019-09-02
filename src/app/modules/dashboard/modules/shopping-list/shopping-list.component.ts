import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.recuder';
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatToDateInput, parseFromIsoString} from '../../../shared/utils/date-utils';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromShoppingList from './shopping-list.reducer';
import {Observable} from 'rxjs';
import {ShoppingList} from './shopping-list.model';

@Component({
  selector: 'diet-shopping-list',
  template: `
    <div class="shopping-list-wrapper">
        <div class="date-inputs-container" [formGroup]="form">
            <input type="date" name="stringFromDate" formControlName="stringFromDate" (change)="onDateChange()">
            <input type="date" name="stringToDate" formControlName="stringToDate" (change)="onDateChange()">
        </div>
        <div class="shopping-list-content">
            <ul *ngIf="(shouldDisplayShoppingListContent() | async)" >
                <li *ngFor="let item of (getCurrentShoppingList() | async).items">
                    {{item.productName}}
                    {{item.amount}}
                </li>
            </ul>
        </div>
    </div>
  `,
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      stringFromDate: formatToDateInput(new Date()),
      stringToDate: formatToDateInput(new Date()),
    });
  }

  ngOnInit(): void {
  }

  onDateChange(): void {
      const {stringFromDate, stringToDate} = this.form.value;
      const fromDate = parseFromIsoString(stringFromDate);
      const toDate = parseFromIsoString(stringToDate);
      console.log(fromDate.toISOString());
      console.log(toDate.toISOString());
      this.store.dispatch(ShoppingListActions.generateShoppingList({fromDate, toDate}));
  }

  getCurrentShoppingList(): Observable<ShoppingList | undefined> {
      return this.store.select(fromShoppingList.selectCurrentShoppingList);
  }

  shouldDisplayShoppingListContent(): Observable<boolean> {
      return this.store.select(fromShoppingList.selectShouldDisplayShoppingList);
  }
}
