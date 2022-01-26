import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product";

@Injectable()
export class TableAndFormService {
    
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