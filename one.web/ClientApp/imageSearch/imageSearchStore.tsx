import {AppThunkAction} from "../common/store";
import {fetch, addTask} from 'domain-task';
import {Action, Reducer, ActionCreator} from 'redux';

import HttpClient from "../http";
const RequestActionType = "REQUEST_IMAGES_DETAIL";
const ResponseActionType = "RECEIVE_IMAGES_DETAIL";

export interface ImageSearchState {
    isLoading : boolean;
    searchTerm : string;
    page?: number;
    imageInfos : ImageInfo[]
}

export interface ImageInfo {
    href : string;
    id : string;
}

interface RequestImageInfosAction {
    type : "REQUEST_IMAGES_DETAIL",
    searchTerm : string,
    page?: number
}

interface RecieveImageInfoAction {
    type : "RECEIVE_IMAGES_DETAIL",
    searchTerm : string,
    page?: number,
    imageInfos : ImageInfo[]
}

type KnownAction = RequestImageInfosAction | RecieveImageInfoAction;

export const actionCreators = {
    requestSearchImages: (term : string, page : number): AppThunkAction < KnownAction > => async(dispatch, getState) => {
        const data = await HttpClient.get < ImageInfo[] > (`images/search?term=${term}&page=${page}`);
        dispatch({type: "RECEIVE_IMAGES_DETAIL", searchTerm: term, page: page, imageInfos: data});
    }
}

const unloadedState : ImageSearchState = {
    searchTerm: "",
    page: 1,
    isLoading: false,
    imageInfos: new Array < ImageInfo > ()
}

export const reducer : Reducer < ImageSearchState >= (state : ImageSearchState, incomingAction : Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case "REQUEST_IMAGES_DETAIL":
            return {searchTerm: action.searchTerm, page: action.page, isLoading: true, imageInfos: state.imageInfos};
        case "RECEIVE_IMAGES_DETAIL":
            return {searchTerm: action.searchTerm, page: action.page, isLoading: false, imageInfos: state.imageInfos};
        default:
            const exhaustiveCheck:never = action;
    }

    return state || unloadedState;

}