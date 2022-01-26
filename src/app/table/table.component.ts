import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TableAndFormService } from '../services/tableAndForm.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ProductService]
})
export class TableComponent implements OnInit {

  public title: string;
  public column_names: string[];
  public rows: Array<any>;
  public data_from_form: any;

  
  constructor(
    //creating service variables
    private _productService: ProductService,
    //tableAndFormService is not included in providers because it is already iincluded in app.module.ts in providers
    private _tableAndFormService: TableAndFormService
  ) {
    this.title = "Products table";

    //column names (table headers)
    this.column_names = ["Id", "Kind", "Name", "Existing stock", "Modify info", "Change stock" ];
    
    //array of elements of type product
    this.rows = [];
  }

  ngOnInit(): void {
    //Listens to any change made in the table and form service and saves that change into the data_from_form variable
    this._tableAndFormService.currentMessage.subscribe((message: any) => {
      console.log(message);
    });
    
    this.rows = this._productService.getProducts(); //fills table with data when the app is loaded
  }

  ngDoCheck() {
    //console.log('Cambios!! ', this.rows) // shows this.rows in console every time it detects a change to any property
    
    //Every time that the user modifies the 'stock' fields it is stored as string
    //This function converts every stock field to integer again.
    this.keepStockAsInteger();
  }

  setRow(row: any): void {
    //pushed a row into the rows array. row must be an object of type Product.
    this.rows.push(row)
  }

  getRows(): Array<any> {
    return this.rows;
  }

  deleteRow(id: string): void {
    // deletes the row that the user clicked.

    // get the element of the given id 
    let element = this.rows.find(element => element.id == id);
    
    // finds it's index
    let index = this.rows.indexOf(element)
    
    //deletes the element in the array with the index given
    this.rows.splice(index,1)
  }

  keepStockAsInteger() {
    //Every time that the user modifies the 'stock' fields it is stored as string
    //This function converts every stock field to integer again.

    this.rows.forEach((element, index)=> {
      let intStock = parseInt(element.stock);
      this.rows[index].stock = intStock
    });
  }

  decreaseStock(id: string): void {
    //decreases the counter of stock in one

    // get the element of the given id 
    let element = this.rows.find(element => element.id == id);

    // finds it's index
    let index = this.rows.indexOf(element)

    //decreases it's value
    this.rows[index].stock -= 1
  }
  
  increaseStock(id: string): void {
    //increases the counter of stock in one

    // get the element of the given id 
    let element = this.rows.find(element => element.id == id);

    // finds it's index
    let index = this.rows.indexOf(element)
    //increases it's value
    this.rows[index].stock += 1
  }

/* 
  editRow(row) {
    //Submits information from selected row to form to be edited and then re-saved again
    this._tableAndFormService.sendData(row)
  } */

  testService() {
    this._tableAndFormService.sendMessage(this.rows[0]);
  }

}
