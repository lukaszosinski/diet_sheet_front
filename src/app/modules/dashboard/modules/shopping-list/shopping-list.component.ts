import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.recuder';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatToDateInput, parseFromIsoDate } from '../../../shared/utils/date-utils';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromShoppingList from './shopping-list.reducer';
import { Observable } from 'rxjs';
import { ShoppingList } from './shopping-list.model';
import { ActivatedRoute } from '@angular/router';
import { concatMap, distinctUntilChanged, filter, first, map, merge } from 'rxjs/operators';
import { ShoppingListItem } from './shopping-list-item/shopping-list-item.model';
import { takeUntilDestroy } from '../../../shared/utils/rxjs-utils';
import { OnDestroyAbstract } from '../../../shared/utils/abstract-injectables/on-destroy-abstract';
import { GranularityEnum } from '../product/granularity.enum';

@Component({
  selector: 'diet-shopping-list',
  template: `
      <div class="shopping-list-wrapper">
          <div class="shopping-list-details-container"
               [class.shopping-list-details-container--update-mode]="!(isCreateMode$() | async)"
               [formGroup]="generateShoppingListForm"
          >
              <div class="shopping-list-name-form" [formGroup]="shoppingListForm">
                  <input class="shopping-list-name" formControlName="name" placeholder="{{'SHOPPING_LIST.NAME_PLACEHOLDER' | translate}}">
              </div>
              <div class="shopping-list-details-dates" *ngIf="isCreateMode$() | async">
                  <div class="date-input-container">
                      <div class="date-header">{{'SHOPPING_LIST.FROM_DATE' | translate}}:</div>
                      <input type="date" name="stringFromDate" formControlName="stringFromDate">
                  </div>
                  <div class="date-input-container">
                      <div class="date-header">{{'SHOPPING_LIST.TO_DATE' | translate}}:</div>
                      <input type="date" name="stringToDate" formControlName="stringToDate">
                  </div>
              </div>
          </div>
          <div class="shopping-list-content" [formGroup]="shoppingListForm">
              <div class="shopping-list-header">{{'SHOPPING_LIST.SHOPPING_LIST' | translate}}:</div>
              <ul>
                  <li class="shopping-list-table-headers">
                      <span>{{'SHOPPING_LIST.PRODUCT' | translate}}:</span>
                      <span class="shopping-list-table-headers-quantity">{{'SHOPPING_LIST.AMOUNT' | translate}}:</span>
                  </li>
                  <li formArrayName="items" *ngFor="let item of getShoppingListItemsFormArray().controls; let i = index">
                      <div [formGroupName]="i" class="shopping-list-item">
                          <div class="shopping-list-item-field">
                              <input class="shopping-list-item-field-name" formControlName="productName">
                              <input class="shopping-list-item-field-amount" type="number" formControlName="amount">
                              <select class="shopping-list-item-field-unit" name="unit" formControlName="unit">
                                  <option *ngFor="let unit of UNITS" [value]="unit">{{'DIET_ENTITY.UNIT.' + unit | translate}}</option>
                              </select>
                          </div>
                          <label class="shopping-list-item-field-checkbox">
                              <input type="checkbox" formControlName="checked">
                              <div></div>
                          </label>
                      </div>
                  </li>
              </ul>
          </div>
          <button class="save-button" (click)="onSaveButtonClick()">{{"SHOPPING_LIST.SAVE" | translate}}</button>
      </div>
  `,
  styleUrls: [ './shopping-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShoppingListComponent extends OnDestroyAbstract implements OnInit {

  readonly MIN_SHOPPING_LIST_ITEMS_LENGTH: number = 8;
  readonly UNITS: GranularityEnum[] = Object.values(GranularityEnum);

  readonly generateShoppingListForm: FormGroup;
  readonly shoppingListForm: FormGroup;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
    this.clearGeneratedShoppingList();
    this.generateShoppingListForm = this.createGenerateShoppingListForm();
    this.shoppingListForm = this.createShoppingListForm();
  }

  private clearGeneratedShoppingList(): void {
    this.store.dispatch(ShoppingListActions.clearGeneratedShoppingList());
  }

  ngOnInit(): void {
    this.generateShoppingListOnGenerateShoppingListFormChanges();
    this.loadShoppingList();
    this.patchFormOnShoppingListSelected();
  }

  private createGenerateShoppingListForm(): FormGroup {
    return this.fb.group({
      stringFromDate: [ formatToDateInput(new Date()), Validators.required ],
      stringToDate: [ formatToDateInput(new Date()), Validators.required ],
    });
  }

  private createShoppingListForm(): FormGroup {
    return this.fb.group({
      name: [ '', Validators.required ],
      items: this.fb.array([])
    });
  }

  private createShoppingListItemFormGroup(item?: ShoppingListItem): FormGroup {
    return this.fb.group({
      productName: [ item && item.productName ],
      amount: [ item && item.amount ],
      unit: [ item && item.unit ],
      checked: [ item && item.checked || false ],
    });
  }

  private loadShoppingList(): void {
    this.getSelectedShoppingListId$()
      .pipe(filter(id => !!id))
      .subscribe((id) => this.store.dispatch(ShoppingListActions.loadShoppingList({ id: id! })));
  }

  private patchFormOnShoppingListSelected(): void {
    this.getSelectedShoppingList$()
      .pipe(takeUntilDestroy(this))
      .subscribe((shoppingList) => this.patchShoppingListForm(shoppingList));
  }

  private getSelectedShoppingList$(): Observable<ShoppingList | undefined> {
    const getSelectedShoppingList$ = this.getSelectedShoppingListId$().pipe(
      filter(id => !!id),
      concatMap((id) => this.store.select(fromShoppingList.selectShoppingListById(id!)))
    );
    const getGeneratedShoppingList$ = this.getSelectedShoppingListId$().pipe(
      filter(id => !id),
      concatMap(() => this.store.select(fromShoppingList.selectGeneratedShoppingList))
    );
    return getSelectedShoppingList$.pipe(merge(getGeneratedShoppingList$));
  }

  private patchShoppingListForm(shoppingList?: ShoppingList): void {
    if (!shoppingList) {
      this.shoppingListForm.reset();
      this.patchShoppingListArrayFrom();
    } else {
      const patchValue = this.getShoppingListPatchValue(shoppingList);
      this.shoppingListForm.patchValue(patchValue);
      this.patchShoppingListArrayFrom(patchValue.items);
    }
    this.changeDetectorRef.markForCheck();
  }

  private getShoppingListPatchValue(shoppingList: Partial<ShoppingList>): ShoppingList {
    const name = shoppingList.name || this.shoppingListForm.value.name;
    const items = shoppingList.items || [];
    return { ...shoppingList, name, items };
  }

  private patchShoppingListArrayFrom(shoppingListItems?: ShoppingListItem[]): void {
    const shoppingListItemsForm = this.getShoppingListItemsFormArray();
    shoppingListItemsForm.clear();
    this.getShoppingListItemsWithCorrectedLength(shoppingListItems)
      .map((item) => this.createShoppingListItemFormGroup(item))
      .forEach((formControl) => shoppingListItemsForm.push(formControl));
  }

  private getShoppingListItemsWithCorrectedLength(shoppingListItems: ShoppingListItem[] = []): (ShoppingListItem | undefined)[] {
    return [
      ...shoppingListItems,
      ...new Array(Math.max(this.MIN_SHOPPING_LIST_ITEMS_LENGTH - shoppingListItems.length, 0)).fill(undefined)
    ];
  }

  private generateShoppingListOnGenerateShoppingListFormChanges(): void {
    this.generateShoppingListForm.valueChanges
      .pipe(takeUntilDestroy(this))
      .subscribe(() => {
        if (this.generateShoppingListForm.valid) {
          const { stringFromDate, stringToDate } = this.generateShoppingListForm.value;
          const fromDate = parseFromIsoDate(stringFromDate);
          const toDate = parseFromIsoDate(stringToDate);
          this.store.dispatch(ShoppingListActions.generateShoppingList({ fromDate, toDate }));
        }
      });
  }

  getShoppingListItemsFormArray(): FormArray {
    return this.shoppingListForm.get('items') as FormArray;
  }

  isCreateMode$(): Observable<boolean> {
    return this.getSelectedShoppingListId$().pipe(map((id) => !id));
  }

  getSelectedShoppingListId$(): Observable<number | undefined> {
    return this.route.params.pipe(
      distinctUntilChanged(),
      map(({ shoppingListId }) => +shoppingListId || undefined)
    );
  }

  onSaveButtonClick(): void {
    if (this.shoppingListForm.valid) {
      this.getSelectedShoppingListId$()
        .pipe(first())
        .subscribe(id => {
          const shoppingList = this.getShoppingListFormValue();
          if (!!id) {
            this.store.dispatch(ShoppingListActions.updateShoppingListAndRedirect({ shoppingList: { ...shoppingList, id } }));
          } else {
            this.store.dispatch(ShoppingListActions.saveShoppingListAndRedirect({ shoppingList }));
          }
        });
    }
  }

  private getShoppingListFormValue(): ShoppingList {
    const value: ShoppingList = this.shoppingListForm.value;
    const items = value.items.filter(item => !!item.productName);
    return { ...value, items };
  }
}
