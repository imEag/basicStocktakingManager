import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  public products: any;
  public product_kinds: Array<String>;

  constructor() {
    this.products = [
      new Product('1', 'Food', 'Kellogs cereal', 10),
      new Product('2', 'Food', 'Butter', 19),
      new Product('3', 'Cosmetics', 'Bread', 56),
      new Product('4', 'Clothing', 'Blue pants', 7),
      new Product('5', 'Electrodomestics', 'Samsung A52', 6),
      new Product('6', 'Clothing', 'White T-shirt', 21),
      new Product('7', 'Food', 'Kellogs cereal', 10),
      new Product('8', 'Cosmetics', 'Butter', 19),
      new Product('9', 'Food', 'Bread', 56),
      new Product('10', 'Clothing', 'Blue pants', 7),
      new Product('11', 'Electrodomestics', 'Samsung A52', 6),
      new Product('12', 'Clothing', 'White T-shirt', 21)
    ];

    this.product_kinds = ['Food', 'Clothing', 'Phones and Tablets', 'Electrodomestics', 'Cosmetics', 'Vehicle Accessories']
  }

  getProducts(): any {
    return this.products;
  }

  getProductKinds(): Array<String> {
    return this.product_kinds;
  }
}
