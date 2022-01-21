import { Injectable, DoCheck } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product";

//FIXME table is not displaying and saving the information given into the rows variables.
@Injectable()
export class TableAndFormService {
    /* This  service is used to send data between the table and the form */
    private data :BehaviorSubject<any>;
    public currentData: Observable<any>;
    
    constructor() {
        this.data = new BehaviorSubject<any>(new Product('', '', '', 0));
        this.currentData = this.data.asObservable();
    }

    sendData(message: any): void {
        //This function updates the data in the service and automatically all components listening to it will get updated info.
        this.data.next(message)
    }

    DoCheck():void {
    }
}