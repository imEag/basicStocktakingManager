import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TableAndFormService } from '../services/tableAndForm.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'],
  providers: [ProductService]
})
export class TableFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public product: Product;
  public product_kinds: Array<String>;
  public data_from_table: any;
  public subscription: any;
  public input_values: any;

  constructor(
    //creating service variables
    private _productService: ProductService,

    //tableAndFormService is not included in providers because it is already included in app.module.ts in providers
    private _tableAndFormService: TableAndFormService
  ) {
    this.form = new FormGroup({
      id: new FormControl('',[Validators.required]),
      kind: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      stock: new FormControl(0,[Validators.required])
    });

    this.product = new Product('', '', '', 0);
    this.product_kinds = [];
    this.input_values = {
      id: '',
      kind: '',
      name: '',
      stock: 0
    }
  }

  ngOnInit(): void {
    //Listens to any change made in the table and form service and saves that change into the data_from_form variable
    this.subscription = this._tableAndFormService.message_table_2_form.subscribe((message: Product) => {
      this.input_values = message;
    });
    //Uses product service to get all product kinds and fill the select in the interface.
    this.product_kinds = this._productService.getProductKinds();
    console.log(this.form)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngDoCheck(): void {
  }

  onSubmit(current_form: any): void {
    let pre_message = current_form.form.value;
    let message = new Product(pre_message.id.toString(), pre_message.kind, pre_message.name, pre_message.stock)

    //Submits information to service and the table listens to it to save and display the data
    this._tableAndFormService.sendForm2Table(message);

    //Resets all fields
    //current_form.reset();
  }

  formReset(): void {
    this.input_values = {
      id: '',
      kind: '',
      name: '',
      stock: 0
    }

  }

}
