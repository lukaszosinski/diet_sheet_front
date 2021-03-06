import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.recuder';
import { FormArray, FormGroup } from '@angular/forms';
import { DietEntityInfoPlaceholderKeys } from '../../../../diet-entity';
import { concatMap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as ProductActions from '../../product/product.actions';
import { takeUntilDestroy } from '../../../../shared/utils/rxjs-utils';
import { Observable } from 'rxjs';
import * as fromProducts from '../../product/product.reducer';
import { ProductDetailsFormService } from './product-details-form.service';
import { ActivatedRoute } from '@angular/router';
import { OnDestroyAbstract } from '../../../../shared/utils/abstract-injectables/on-destroy-abstract';
import { Summary } from '../../../../diet-entity/summary.model';


@Component({
  selector: 'diet-product-details',
  template: `
      <form class="product-details-wrapper" [formGroup]="form">
          <div class="product-details-header">
              <diet-square-cancel-button (click)="onCancelButtonClick()"></diet-square-cancel-button>
              <diet-square-confirm-button
                      (click)="onConfirmButtonClick()"
                      *ngIf="!form.disabled">
              </diet-square-confirm-button>
          </div>
          <diet-entity-info
                  class="product-details-info"
                  [placeholderKeys]="PRODUCT_PLACEHOLDER_KEYS"
                  [displayUnits]="true"
                  [infoFormGroup]="form">
          </diet-entity-info>
          <diet-entity-item-table
                  class="product-details-prices-table"
                  [tableTitle]="'PRODUCT.PRICE' | translate"
                  [columnHeaders]="['PRODUCT.SHOP' | translate]"
                  [itemsFormArray]="getPricesForm()"
                  (addButtonClick)="onAddPriceClick()"
                  (deleteClick)="onDeletePriceClick($event)">
          </diet-entity-item-table>
          <diet-entity-full-summary [summary]="getSummaryFormGroup().value"
                                    (valueChange)="onSummaryChange($event)"
          ></diet-entity-full-summary>
      </form>
  `,
  styleUrls: [ './product-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ProductDetailsFormService, useClass: ProductDetailsFormService }
  ]
})
export class ProductDetailsComponent extends OnDestroyAbstract implements OnInit {

  readonly PRODUCT_PLACEHOLDER_KEYS: DietEntityInfoPlaceholderKeys = {
    name: 'PRODUCT.NAME_PLACEHOLDER',
    description: 'PRODUCT.DESCRIPTION_PLACEHOLDER',
  };

  readonly form: FormGroup;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private formService: ProductDetailsFormService) {
    super();
    this.form = this.formService.form;
  }

  ngOnInit(): void {
    this.loadProduct();
    this.patchFormOnProductSelected();
  }


  private loadProduct(): void {
    this.getSelectedProductId$()
      .pipe(filter(productId => !!productId))
      .subscribe((id) => this.store.dispatch(ProductActions.loadProduct({ id: id! })));
  }

  private getSelectedProductId$(): Observable<number | undefined> {
    return this.route.params.pipe(
      distinctUntilChanged(),
      map(({ productId }) => +productId)
    );
  }

  private patchFormOnProductSelected(): void {
    this.getSelectedProduct$()
      .pipe(takeUntilDestroy(this))
      .subscribe((product) => {
        this.formService.patchForm(product);
        if (product.public) {
          this.form.disable();
        }
      });
  }

  private getSelectedProduct$(): Observable<Product> {
    return this.getSelectedProductId$()
      .pipe(
        filter(id => !!id),
        concatMap((id) => this.store.select(fromProducts.selectProductById(id!))),
        filter(product => !!product)
      ) as Observable<Product>;
  }

  getPricesForm(): FormArray {
    return this.formService.getPriceArrayForm();
  }

  onAddPriceClick(): void {
    this.formService.addPriceForm();
  }

  onDeletePriceClick(i: number): void {
    this.formService.removePriceForm(i);
  }

  getSummaryFormGroup(): FormGroup {
    return this.formService.getSummaryForm();
  }

  onConfirmButtonClick(): void {
    this.getSelectedProductId$()
      .subscribe((id) => {
        const product: Product = this.formService.getProductFromValue();
        if (!id) {
          this.store.dispatch(ProductActions.createProductAndRedirect({ product }));
        } else {
          this.store.dispatch(ProductActions.updateProductAndRedirect({ product: { ...product, id } }));
        }
      });
  }

  onCancelButtonClick(): void {
    this.store.dispatch(ProductActions.redirectFromProductDetails({}));
  }

  onSummaryChange(summary: Summary): void {
    this.getSummaryFormGroup().patchValue(summary);
  }
}
