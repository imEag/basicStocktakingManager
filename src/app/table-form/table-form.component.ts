import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'], 
  providers: [ProductService]
})
export class TableFormComponent implements OnInit {
  public product: Product;
  public product_kinds: Array<String>;

  constructor(
    private _productService: ProductService
  ) { 
    this.product = new Product('', '', '', 0);
    this.product_kinds = [];
  }

  ngOnInit(): void {
    this.product_kinds = this._productService.getProductKinds();
    console.log(this.product_kinds);
  }

  ngDoCheck():void {
    console.log(this.product)
  }
  
  onSubmit(form: any): void {
    console.log(this.product, form);
    form.reset();
  }

  formReset(form: any): void {
    form.reset();
  }

}
