import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TableAndFormService } from '../services/tableAndForm.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'], 
  providers: [ProductService]
})
export class TableFormComponent implements OnInit {
  
  public product: Product;
  public product_kinds: Array<String>;
  public data_from_table: any;

  constructor(
    //creating service variables
    private _productService: ProductService,
    //tableAndFormService is not included in providers because it is already iincluded in app.module.ts in providers
    private _tableAndFormService: TableAndFormService
  ) { 
    this.product = new Product('', '', '', 0);
    this.product_kinds = [];
  }

  ngOnInit(): void {
    //Listens to any change made in the table and form service and saves that change into the data_from_form variable
    this._tableAndFormService.currentMessage.subscribe((message: any) => {
      console.log(message);
    });
    //Uses product service to get all product kinds and fill the select in the interface.
    this.product_kinds = this._productService.getProductKinds();
  }

  ngDoCheck():void {
  }
  
  onSubmit(current_form: any): void {
    let pre_message = current_form.form.value;
    let message = new Product(pre_message.id.toString(), pre_message.kind, pre_message.name, pre_message.stock)
    
    //Submits information to service and the table listens to it to save and display the data
    this._tableAndFormService.sendMessage(message);

    //Resets all fields
    //current_form.reset();
  }

  formReset(form: any): void {
    //Resets all fields
    form.reset();
  }

}
