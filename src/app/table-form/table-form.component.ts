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

  /* This is the form.
   it is built using reactiveFormsModule */
  public form: FormGroup;

  public product: Product;
  public product_kinds: Array<String>;
  public subscription: any;
  public input_values: any;

  constructor(
    //creating service variables
    private _productService: ProductService,

    //tableAndFormService is not included in providers because it is already included in app.module.ts in providers
    private _tableAndFormService: TableAndFormService
  ) {

    /* This is the form.
    it is built using reactiveFormsModule */
    this.form = new FormGroup({

      /* first argument is the initial value of the input 
      Second value is an array of validators*/
      id: new FormControl('',[Validators.required]),
      kind: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      stock: new FormControl(0,[Validators.required])
    });

    this.product = new Product('', '', '', 0);
    this.product_kinds = [];
    
  }

  ngOnInit(): void {
    //Listens to any change made in the tableAndForm service
    this.subscription = this._tableAndFormService.message_table_2_form.subscribe((message: Product) => {
      this.form.controls['id'].setValue(message.id);
      this.form.controls['kind'].setValue(message.kind);
      this.form.controls['name'].setValue(message.name);
      this.form.controls['stock'].setValue(message.stock);
    });

    //Uses product service to get all product kinds and fill the select in the interface.
    this.product_kinds = this._productService.getProductKinds();
    console.log(this.form)
  }

  ngOnDestroy(): void {
    //Unsubscribes from tableAndForm service when this component is destroyed.
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    let message = new Product(
      this.form.value.id,
      this.form.value.kind,
      this.form.value.name, 
      this.form.value.stock
      );

    console.log(message);
    //Submits information to service and the table listens to it to save and display the data
    this._tableAndFormService.sendForm2Table(message);

    //Resets all fields
    this.formReset();
  }

  formReset(): void {
    //resets form values and validator
    this.form.reset();
  }

}
