import { Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.recuder';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatToDateInput, parseFromIsoString} from '../../../shared/utils/date-utils';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromShoppingList from './shopping-list.reducer';
import {Observable} from 'rxjs';
import {ShoppingList, ShoppingListItem} from './shopping-list.model';

@Component({
  selector: 'diet-shopping-list',
  template: `
    <div class="shopping-list-wrapper">
        <div class="date-inputs-container" [formGroup]="dateForm">
            <input type="date" name="stringFromDate" formControlName="stringFromDate" (change)="onDateChange()">
            <input type="date" name="stringToDate" formControlName="stringToDate" (change)="onDateChange()">
        </div>
        <div class="shopping-list-content">
            <ul *ngIf="(shouldDisplayShoppingListContent() | async)" [formGroup]="shoppingListItemsForm">
                <li *ngFor="let item of shoppingListItemsForm.controls; let i = index">
                    <div [formGroupName]="i">
                        <input type="text" formControlName="productName" value="{{getItem(i).productName}}">
                        <input type="number" formControlName="amount" value="{{getItem(i).amount}}">
                        <input type="text" formControlName="unit" value="{{getItem(i).unit}}">
                        <input type="checkbox" formControlName="checked" value="{{getItem(i).checked}}">
                    </div>
                </li>
            </ul>
            <button (click)="onSaveButtonClick()">Save</button>
        </div>
    </div>
  `,
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  dateForm: FormGroup = this.fb.group({});

  shoppingListItemsForm: FormArray = this.fb.array([]);

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.initializeDateForm();
  }

  private initializeDateForm(): void {
    this.dateForm = this.fb.group({
      stringFromDate: formatToDateInput(new Date()),
      stringToDate: formatToDateInput(new Date()),
    });
  }

  private createShoppingListItemForm(item?: ShoppingListItem): FormGroup {
   return this.fb.group({
      productName: [ item && item.productName, Validators.required ],
      amount: [ item && item.amount, Validators.required ],
      unit: [ item && item.unit, Validators.required ],
      checked: [ item && item.checked, Validators.required ],
    });
  }

  getItem(i: number): ShoppingListItem | undefined {
    return this.shoppingListItemsForm.getRawValue()[i];
  }

  ngOnInit(): void {
    this.getCurrentShoppingList().subscribe(this.onCurrentShoppingListChange);
  }

  onDateChange(): void {
      const {stringFromDate, stringToDate} = this.dateForm.value;
      const fromDate = parseFromIsoString(stringFromDate);
      const toDate = parseFromIsoString(stringToDate);
      this.store.dispatch(ShoppingListActions.generateShoppingList({fromDate, toDate}));
  }

  onCurrentShoppingListChange = (shoppingList: ShoppingList | undefined) => {
    if (!!shoppingList) {
      this.shoppingListItemsForm.clear();
      shoppingList.items.map(item =>
        this.createShoppingListItemForm(item)
      ).forEach(formItem => this.shoppingListItemsForm.push(formItem));
    }
  };

  onSaveButtonClick(): void {
    const {stringFromDate, stringToDate} = this.dateForm.value;
    const shoppingListName = stringFromDate + '_' + stringToDate;
    this.store.dispatch(ShoppingListActions.saveShoppingList({shoppingList: {
        name: shoppingListName,
        items: this.shoppingListItemsForm.value
      }}));
  }

  getCurrentShoppingList(): Observable<ShoppingList | undefined> {
      return this.store.select(fromShoppingList.selectCurrentShoppingList);
  }

  shouldDisplayShoppingListContent(): Observable<boolean> {
      return this.store.select(fromShoppingList.selectShouldDisplayShoppingList);
  }
}
