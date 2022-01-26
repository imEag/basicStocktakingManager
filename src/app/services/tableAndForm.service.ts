import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product";

@Injectable()
export class TableAndFormService {
    //This service is meant to be a data stream from the table to the form-table and viceversa
    
    public data: Subject<any>;
    public currentMessage: any;

    constructor() {
        this.data = new Subject();
        this.currentMessage = this.data.asObservable();
    }

    sendMessage(message: Product):void {
        this.data.next(message);
    }

}