import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  public products: any;

  constructor() {
    this.products = [
      new Product('1', 'food', 'Kellogs cereal', 10),
      new Product('2', 'food', 'Butter', 19),
      new Product('3', 'food', 'Bread', 56),
      new Product('4', 'clothing', 'Blue pants', 7),
      new Product('5', 'Electronics', 'Samsung A52', 6),
      new Product('6', 'clothing', 'White T-shirt', 21),
      new Product('7', 'food', 'Kellogs cereal', 10),
      new Product('8', 'food', 'Butter', 19),
      new Product('9', 'food', 'Bread', 56),
      new Product('10', 'clothing', 'Blue pants', 7),
      new Product('11', 'Electronics', 'Samsung A52', 6),
      new Product('12', 'clothing', 'White T-shirt', 21)
    ];
  }

  getProducts(): any {
    return this.products;
  }
}
