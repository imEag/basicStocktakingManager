import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { elementAt } from 'rxjs';
import { ProductService } from '../services/product.service';

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

  
  constructor(
    private _productService: ProductService
  ) {
    this.title = "Products table";

    //column names (table headers)
    this.column_names = ["Id", "Kind", "Name", "Existing stock", "Modify info", "Change stock" ];
    
    this.rows = [];
  }

  ngOnInit(): void {
    this.rows = this._productService.getProducts(); //fills table with data when the app is loaded
    console.log(this.rows);
  }

  ngDoCheck() {
    console.log('Cambios!! ', this.rows) // shows this.rows in console every time it detects a change to any property
    
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

}
