import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../app.recuder';
import * as ProductActions from '../product.actions';
import * as fromProduct from '../product.reducer';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'diet-product-list',
  template: `
      <diet-entity-with-summary-list class="diet-entity-with-summary-list"
                                     [dietEntities]="meals$ | async"
                                     (entityClick)="onProductClick($event)"
                                     (addEntity)="onAddProductClick()"
                                     [addButtonTitle]="'PRODUCT.ADD_PRODUCT' | translate"
      ></diet-entity-with-summary-list>

  `,
  styleUrls: [ './product-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  readonly meals$: Observable<Product[]>;

  constructor(private store: Store<AppState>,
              private router: Router,
  ) {
    this.meals$ = this.store.select(fromProduct.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onProductClick(product: Product): void {
    this.goToProductDetails(product.id);
  }

  onAddProductClick(): void {
    this.goToProductDetails();
  }

  private goToProductDetails(id?: number): void {
    const redirectUrl = id === undefined ? undefined : this.router.url;
    this.store.dispatch(ProductActions.redirectToProductDetails({ id, redirectUrl }));
  }
}
