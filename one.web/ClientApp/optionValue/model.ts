export interface OptionValue{
    value:string;
    id:number;
    featureId:number;
    optionId:number;
    optionValueType:OptionValueType;
    order:number;
}

export interface NewOptionValue{
    optionValueType:OptionValueType;
    value:string;
}

export enum OptionValueType{
    Notes,
    Rating,
    Number,
    YesNo,
    Media,
    Locaiton,
    Sticker
}