import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() updateMode: boolean;
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
