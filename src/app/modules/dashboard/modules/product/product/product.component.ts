import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../../api/models/product';

@Component({
  selector: 'diet-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss' ]
})
export class ProductComponent implements OnInit {

  @Input() product: Product | undefined;
  @Input() updateMode = false;
  @Output() deleteRequest = new EventEmitter<Product>();
  @Output() applyRequest = new EventEmitter<Product>();

  ngOnInit() {
  }

  delete(): void {
    this.deleteRequest.emit(this.product);
  }

  update(): void {
    if (this.updateMode) {
      this.applyRequest.emit(this.product);
    }
    this.updateMode = !this.updateMode;
  }
}
