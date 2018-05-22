import { NewOption, Option } from "./model";

export interface AddOptionAction {
    type : "ADD_OPTION";
    storyId:string;
    option : NewOption;
}

export interface AddOptionSuccessAction{
    type: "ADD_OPTION_SUCCESS";
    storyId:string;
    id:number;
    option:NewOption;
}

export interface DelteOptionAction{
    type:"DELETE_OPTION";
    storyId:string;
    id:number;
}

export interface DeleteOptionSuccessAction{
    type:"DELETE_OPTION_SUCCESS",
    storyId:string;
    id:number;
}

export interface UpdateOptionAction{
    type:"UPDATE_OPTION",
    storyId:string;
    id:number;
    field:string;
    value:string|number;
}

export interface UpdateOptionSuccessAction{
    type:"UPDATE_OPTION_SUCCESS",
    storyId:string;
    optionId:number;
    title:string;
}

export type KnownOptionAction = AddOptionAction| AddOptionSuccessAction|DelteOptionAction|DeleteOptionSuccessAction|UpdateOptionAction|UpdateOptionSuccessAction;