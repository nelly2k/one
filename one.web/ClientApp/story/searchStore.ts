import {Story, SearchRequest, SearchResponse} from "./list/model";
import {AppThunkAction} from "../common/store";
import {Action, Reducer, ActionCreator} from 'redux';
import HttpClient from "../http";
import {Entity} from "../common";
import {AddStorySuccessAction} from "./storyActions"
import {RequestSearchAction,ReceiveSearchAction} from "./list/actions";

export interface State {
    isLoading : boolean;
    searchRequest?: SearchRequest;
    stories : Story[];
}


type KnownAction = RequestSearchAction | ReceiveSearchAction |AddStorySuccessAction ;
export const actionCreators = {
    search: (request : SearchRequest): AppThunkAction < KnownAction > => async(dispatch, getState) => {
        const response = await HttpClient.get < SearchResponse > (Entity.Story, `?${HttpClient.BuildQueryFromObject(request)}`);
        dispatch({type: "SEARCH_SUCCESS", searchRequest: request, stories: response.stories})
    }
}

const unloadedState : State = {
    isLoading: false,
    stories: []
};

export const reducer : Reducer < State > = (state : State, incomingAction : Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {

        case "SEARCH":
            return {searchRequest: action.searchRequest, isLoading: true, stories: state.stories}
        case "SEARCH_SUCCESS":
            return {searchRequest: action.searchRequest, isLoading: false, stories: action.stories};
        case "ADD_STORY_SUCCESS":
            var story:Story = {id:action.id, title:action.story.title, featuresNumber:0, optionsNumber:0};
            return {searchRequest:state.searchRequest, isLoading:false, stories: [story].concat(state.stories)};
        default:
            const exhaustiveCheck:
            never = action;
    }
    return state || unloadedState;
}