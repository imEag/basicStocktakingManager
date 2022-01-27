import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product";

@Injectable()
export class TableAndFormService {
    //This service is meant to be a data stream from the table to the form-table and viceversa
    
    /* table listens to this observable to add rows */
    public subject_form_2_table: Subject<any>;
    public message_form_2_table: any;

    /* form listens to this observable */
    public subject_table_2_form: Subject<any>;
    public message_table_2_form: any;

    constructor() {
        this.subject_form_2_table = new Subject();
        this.message_form_2_table = this.subject_form_2_table.asObservable();

        this.subject_table_2_form = new Subject();
        this.message_table_2_form = this.subject_table_2_form.asObservable();
    }

    sendForm2Table(message: Product):void {
        //this method sends data from the form to the observable and the table gets that data
        this.subject_form_2_table.next(message);
    }

    sendTable2Form(message: Product):void {
        //This method sends data from table to the observable and the form gets that data
        this.subject_table_2_form.next(message);
    }

}