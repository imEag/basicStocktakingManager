import { Component, OnInit, DoCheck, Input, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TableAndFormService } from '../services/tableAndForm.service';

//TODO Create the function to sort the table according to id, kind, name or stock.
//TODO Add a search bar to the table.
//TODO Create an scrollin efect to the table.

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ProductService]
})
export class TableComponent implements OnInit, OnDestroy {

  public title: string;
  public column_names: string[];
  public rows: Array<any>;
  public data_from_form: any;
  public subscription: any;

  
  constructor(
    //creating service variables
    private _productService: ProductService,

    //tableAndFormService is not included in providers because it is already included in app.module.ts in providers
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
    this.subscription = this._tableAndFormService.message_form_2_table.subscribe((message: any) => {
      this.addRow(message);
    });
    
    this.rows = this._productService.getProducts(); //fills table with data when the app is loaded
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  ngDoCheck() {
    //Every time that the user modifies the 'stock' fields it is stored as string
    //This function converts every stock field to integer again.
    this.keepStockAsInteger();
  }

  addRow(row: any): void {
    // pushed a row into the rows array. If the id already exist, that row will be replaced by the new one. row must be an object of type Product.

    let index = this.findRowindex(row.id);
    
    if (this.rows[index]) {
      //If this row already exists, it will be replaced by the new one.
      this.rows[index] = row;
    } else {
      this.rows.push(row)
    }
  }

  getRows(): Array<any> {
    return this.rows;
  }

  deleteRow(row: any): void {
    // Deletes the given row from the rows array.

    // finds it's index
    let index = this.findRowindex(row.id);
    
    //deletes the element in the array with the index given
    this.rows.splice(index,1)
  }

  keepStockAsInteger(): void {
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

  
  editRow(row: Product) {
    //Submits information from selected row to form to be edited and then re-saved again
    this.deleteRow(row);
    this._tableAndFormService.sendTable2Form(row);
  }

  findRowindex(given_id: string): any {
    //given and id (string) returns a number or array of numbers with the index of the element in the 'rows' array with the id given. 
    let element = this.rows.find(element => element.id === given_id);
    let index = this.rows.indexOf(element);
    return index;
  }
}
