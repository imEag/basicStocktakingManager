import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public title: string;
  public column_names: string[];
  public rows: any;

  public testRow: Array<any>;
  
  constructor() {
    this.title = "Products table"
    this.column_names = ["Id", "Kind", "Name", "Existing stock", "Modify info", "Change stock" ]
    /* this.rows=[["a", "b", "c", "d"], ["a1", "bd", "cf", "df"]] */
    this.rows = {
      "1": ["1", "food", "cereal", 10],
      "2": ["2", "clothing", "pants", 12]
    } //rows only stores 4 values per row (id, kind, name, stock)
    
    this.testRow = ["3", "bsdad", "csdaf", 15]
  }

  ngOnInit(): void {
  }

  setRow(row: Array<any>): void {
    this.rows[row[0]] = row;
  }

  getAllRowsAsArray(): Array<any> {
    let rows_obj = this.rows
    let rows_array = Object.values(rows_obj)
    return rows_array
  }

  deleteRow(id: string): void {
    delete this.rows[id]
  }

  decreaseStock(id: string): void {
    let oldNumber = parseInt(this.rows[id][3])
    this.rows[id][3] = oldNumber -= 1
  }
  
  increaseStock(id: string): void {
    let oldNumber = parseInt(this.rows[id][3])
    this.rows[id][3] = oldNumber += 1
  }

}
