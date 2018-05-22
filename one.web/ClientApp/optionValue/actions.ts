import { OptionValueType } from "./model";

interface BaseValueAction{
    storyId:string;
    featureId:number;
    optionId:number;
    valueType:OptionValueType;
    value:string;
    order?:number;
}

export interface AddOptionValueAction extends BaseValueAction{
    type:"ADD_VALUE",
}

export interface AddOptionValueFailAction extends BaseValueAction{
    type:"ADD_VALUE_FAIL",
}

export interface UpdateValueSuccessAction{
    type: "UPDATE_VALUE_SUCCESS",
    storyId:string;
    featureId:number;
    optionId:number;
    value:string;
}

export type KnownOptionValueAction = 
    AddOptionValueAction
    | AddOptionValueFailAction
    | UpdateValueSuccessAction;