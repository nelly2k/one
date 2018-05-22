import { ITitled } from "../common";

export interface NewOption{
    title:string;
}

export interface Option extends ITitled{
    id:number;
    title:string;
}