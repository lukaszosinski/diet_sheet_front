import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { AppState } from '../../../../../app.recuder';
import { Product } from '../product.model';
import * as fromProduct from '../product.reducer';
import * as ProductActions from '../product.actions';

@Component({
  selector: 'diet-select-product-dialog',
  template: `
      <diet-entity-with-summary-list class="diet-entity-with-summary-list"
                                     [dietEntities]="products$ | async"
                                     (entityClick)="onProductClick($event)"
                                     (addEntity)="onAddProductClick()"
                                     [addButtonTitle]="'PRODUCT.ADD_PRODUCT' | translate"
      ></diet-entity-with-summary-list>
  `,
  styleUrls: [ './select-product-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectProductDialogComponent implements OnInit {

  readonly products$: Observable<Product[]>;

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<SelectProductDialogComponent>
  ) {
    this.products$ = this.store.select(fromProduct.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onProductClick(product: Product): void {
    this.dialogRef.close({ product });
  }

  onAddProductClick(): void {
    console.log('Should redirect to create product');
  }
}
