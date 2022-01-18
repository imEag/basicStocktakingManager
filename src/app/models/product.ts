export class Product {
    constructor(
        //id must be unique!
        public id: string,
        public kind: string,
        public name: string,
        public stock: number
    ) { }
}
