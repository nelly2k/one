export class NotFoundError extends Error{

    public entity:string;

    constructor(entity:string){
        super();
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.entity = entity;
    }
}


export class BadRequestError extends Error{

    public response:any;

    constructor (response?:any){
        super();
        this.response = response;
        Object.setPrototypeOf(this, BadRequestError.prototype);
   }
}