import { Injectable, DoCheck } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Product } from "../models/product";

//FIXME table is not displaying and saving the information given into the rows variables.
@Injectable()
export class TableAndFormService {
    
    public data: BehaviorSubject<any>;
    public currentMessage: any;

    constructor() {
        this.data = new BehaviorSubject(new Product('', '', '', 0));
        this.currentMessage = this.data.asObservable();
    }

    sendMessage(message: any):void {
        this.data.next(message);
    }

    

}