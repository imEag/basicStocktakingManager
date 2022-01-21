import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TableAndFormService } from '../services/tableAndForm.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'], 
  providers: [ProductService, TableAndFormService]
})
export class TableFormComponent implements OnInit {
  public product: Product;
  public product_kinds: Array<String>;
  public data_from_table: any;

  constructor(
    //creating service variables
    private _productService: ProductService,
    private _tableAndFormService: TableAndFormService
  ) { 
    this.product = new Product('', '', '', 0);
    this.product_kinds = [];
  }

  ngOnInit(): void {
    //Listens to any change made in the table and form service and saves that change into the data_from_form variable
    this._tableAndFormService.currentData.subscribe(received_data => this.data_from_table = received_data);

    //Uses product service to get all product kinds and fill the select in the interface.
    this.product_kinds = this._productService.getProductKinds();
  }

  ngDoCheck():void {
  }
  
  onSubmit(current_form: any): void {
    //Submits information to service and the table listens to it to save and display the data
    this._tableAndFormService.sendData(current_form.form.value)

    //Resets all fields
    //current_form.reset();
  }

  formReset(form: any): void {
    //Resets all fields
    form.reset();
  }

}
