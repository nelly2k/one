import {NewFeature} from "./add/model";
import { Feature } from "./list/model";
export interface AddFeatureAction{
    type:"ADD_FEATURE",
    feature:NewFeature,
    storyId:string
}

export interface AddFeatureSuccessAction{
    type:"ADD_FEATURE_SUCCESS",
    feature:NewFeature,
    id:number,
    storyId:string
}

export interface DeleteFeatureAction{
    type:"DELETE_FEATURE",
    storyId:string,
    id:number
}

export interface DeleteFeatureSuccessAction{
    type:"DELETE_FEATURE_SUCCESS",
    storyId:string,
    id:number
}

export interface UpdateFeatureActions{
    type:"UPDATE_FEATURE",
    storyId:string;
    id:number;
    field:string;
    value:string;
}

export interface UpdateFeatureSuccessAction{
    type:"UPDATE_FEATURE_SUCCESS",
    storyId:string;
    id:number;
    field:string;
    value:string | number;
}

export interface UpdateFeatureFailAction{
    type: "UPDATE_FEATURE_FAIL",
    storyId:string;
    id:number;
    field:string;
    original:string | number;
}

export type KnownFeatureActions = AddFeatureAction | AddFeatureSuccessAction
    | DeleteFeatureAction | DeleteFeatureSuccessAction |UpdateFeatureSuccessAction; 