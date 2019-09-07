import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.recuder';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatToDateInput, parseFromIsoString} from '../../../shared/utils/date-utils';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromShoppingList from './shopping-list.reducer';
import {Observable} from 'rxjs';
import {ShoppingList} from './shopping-list.model';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, first, map} from 'rxjs/operators';
import {ShoppingListItem} from './shopping-list-item/shopping-list-item.model';

@Component({
  selector: 'diet-shopping-list',
  template: `
      <div class="shopping-list-wrapper">
          <div *ngIf="!isUpdateMode" class="date-inputs-container" [formGroup]="dateForm">
              <div class="date-input">
                  <div class="date-header">{{'SHOPPING_LIST.FROM_DATE' | translate}}:</div>
                  <input type="date" name="stringFromDate" formControlName="stringFromDate" (change)="onDateChange()">
              </div>
              <div class="date-input">
                  <div class="date-header">{{'SHOPPING_LIST.TO_DATE' | translate}}:</div>
                  <input type="date" name="stringToDate" formControlName="stringToDate" (change)="onDateChange()">
              </div>
          </div>
          <div class="shopping-list-content"
               *ngIf="shoppingListItemsForm.controls.length > 0"
               [formGroup]="shoppingListItemsForm">
              <ul>
                  <li>
                      <span class="shopping-list-header">{{'SHOPPING_LIST.SHOPPING_LIST' | translate}}:</span>
                  </li>
                  <li class="shopping-list-table-headers">
                      <span>{{'SHOPPING_LIST.PRODUCT' | translate}}:</span>
                      <span>{{'SHOPPING_LIST.AMOUNT' | translate}}:</span>
                  </li>
                  <li *ngFor="let item of shoppingListItemsForm.controls; let i = index">
                      <div [formGroupName]="i" class="shopping-list-item">
                          <div class="container-with-underline">
                              <input class="shopping-list-item-field-name"
                                     type="text" formControlName="productName"
                                     value="{{getItem(i).productName}}"
                              >
                              <input class="shopping-list-item-field-amount"
                                     type="number" formControlName="amount"
                                     value="{{getItem(i).amount}}"
                              >
                              <input class="shopping-list-item-field-unit"
                                     type="text" formControlName="unit"
                                     value="{{'DIET_ENTITY.UNIT.' + (getItem(i).unit ? getItem(i).unit : '') | translate}}"
                              >
                          </div>
                          <input type="checkbox" formControlName="checked" value="{{getItem(i).checked}}">
                      </div>
                  </li>
              </ul>
          </div>
          <button class="save-button" (click)="onSaveButtonClick()">{{"SHOPPING_LIST.SAVE" | translate}}</button>
      </div>
  `,
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShoppingListComponent implements OnInit {

  INIT_EMPTY_SHOPPING_LIST_ITEMS: number = 8;

  dateForm: FormGroup = this.fb.group({});
  shoppingListItemsForm: FormArray = this.fb.array([]);
  isUpdateMode: boolean = false;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute) {
    this.initializeDateForm();
    this.patchShoppingListArrayFrom();
  }

  ngOnInit(): void {
    this.getCurrentShoppingList().subscribe(this.onCurrentShoppingListChange.bind(this));
    this.getSelectedShoppingListId$().pipe(first()).subscribe(shoppingListId => {
      if (!!shoppingListId) {
        this.store.dispatch(ShoppingListActions.loadShoppingList({id: +shoppingListId}));
      } else {
        this.patchShoppingListArrayFrom();
        this.isUpdateMode = false;
      }
    });
  }

  private initializeDateForm(): void {
    this.dateForm = this.fb.group({
      stringFromDate: formatToDateInput(new Date()),
      stringToDate: formatToDateInput(new Date()),
    });
  }
  private patchShoppingListArrayFrom(shoppingListItems?: any[]): void {
    this.shoppingListItemsForm.clear();
    (shoppingListItems || new Array(this.INIT_EMPTY_SHOPPING_LIST_ITEMS).fill(undefined))
      .map((item) => this.createShoppingListItemForm(item))
      .forEach((formControl) => this.shoppingListItemsForm.push(formControl));
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

  getSelectedShoppingListId$(): Observable<string | undefined> {
    return this.route.params.pipe(
      distinctUntilChanged(),
      map(({ shoppingListId }) => shoppingListId)
    );
  }

  onCurrentShoppingListChange(shoppingList: ShoppingList | undefined): void {
    if (!!shoppingList) {
      this.isUpdateMode = !!shoppingList.id;
      this.patchShoppingListArrayFrom(shoppingList.items);
    } else {
      this.patchShoppingListArrayFrom();
    }
    this.changeDetector.markForCheck();
  }

  onDateChange(): void {
      const {stringFromDate, stringToDate} = this.dateForm.value;
      const fromDate = parseFromIsoString(stringFromDate);
      const toDate = parseFromIsoString(stringToDate);
      this.store.dispatch(ShoppingListActions.generateShoppingList({fromDate, toDate}));
  }

  onSaveButtonClick(): void {
    if (!this.isUpdateMode) {
      const {stringFromDate, stringToDate} = this.dateForm.value;
      const shoppingListName = stringFromDate + ':' + stringToDate;
      this.store.dispatch(ShoppingListActions.saveShoppingList({shoppingList: {
          name: shoppingListName,
          items: this.shoppingListItemsForm.value
        }
      }));
    } else {
      this.getSelectedShoppingListId$().pipe(first()).subscribe(shoppingListId => {
        if (!!shoppingListId) {
          this.store.dispatch(ShoppingListActions.updateShoppingList({shoppingList: {
              id: +shoppingListId,
              items: this.shoppingListItemsForm.value
            }
          }));
        }
      });
    }
  }

  getCurrentShoppingList(): Observable<ShoppingList | undefined> {
      return this.store.select(fromShoppingList.selectCurrentShoppingList);
  }
}
