import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GranularityEnum } from '../granularity.enum';
import { Product } from '../product.model';
import { Price } from '../price.model';

@Injectable()
export class ProductDetailsFormService {

  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      granularity: GranularityEnum.HUNDRED_GRAMS,
      summary: this.fb.group({
        kcal: [ undefined, Validators.required ],
        proteins: [ undefined, Validators.required ],
        carbs: [ undefined, Validators.required ],
        fat: [ undefined, Validators.required ]
      }),
      prices: this.fb.array([ this.createPriceForm() ]),
    });
  }

  private createPriceForm(price?: Price): FormGroup {
    const priceForm = this.fb.group({
      amount: [ price && price.amount, Validators.required ],
      name: [ price && price.name, Validators.required ],
      unit: [ 'PLN' ],
    });
    priceForm.get('unit')!.disable();
    return priceForm;
  }

  patchForm(product: Product): void {
    const productWithUpdatedPriceList = { ...product, prices: product.prices || [] };
    this.form.patchValue(productWithUpdatedPriceList);
    this.patchPricesForm(productWithUpdatedPriceList.prices);
  }

  private patchPricesForm(prices: Price[]): void {
    const priceArrayForm = this.getPriceArrayForm();
    priceArrayForm.clear();
    prices
      .map(price => this.createPriceForm(price))
      .forEach(ingredient => priceArrayForm.push(ingredient));
  }

  getPriceArrayForm(): FormArray {
    return this.form.get('prices') as FormArray;
  }

  getSummaryForm(): FormGroup {
    return this.form.get('summary') as FormGroup;
  }

  addPriceForm(): void {
    this.getPriceArrayForm().push(this.createPriceForm());
  }

  removePriceForm(index: number): void {
    this.getPriceArrayForm().removeAt(index);
  }

  getProductFromValue(): Product {
    const product = this.form.value;
    const prices = this.getPriceArrayForm().controls
      .filter(control => control.valid)
      .map(control => control.value);
    return { ...product, prices };
  }
}
