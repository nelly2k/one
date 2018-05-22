import {AppThunkAction} from "../common/store";
import {Action, Reducer, ActionCreator} from 'redux';
import HttpClient from "../http";

import {KnownFeatureActions} from "./actions";
import {Feature} from "./list/model";
import {NewFeature} from "./add/model";
import {Entity} from "../common";
import {FetchStoryAction, FetchStorySuccessAction} from "../story/storyActions";

export interface FeatureState {
    isLoading : boolean;
    storyId?: string;
    features : Feature[];
}

type KnownAction = KnownFeatureActions | FetchStorySuccessAction | FetchStoryAction;

export const actionCreator = {
    addNewFeature: (storyId : string, newFeature : NewFeature): AppThunkAction < KnownAction > => async(dispatch, getState) => {
        dispatch({type: "ADD_FEATURE", storyId: storyId, feature: newFeature});
        var newFeatureId = await HttpClient.post < NewFeature,
            number > (Entity.Feature, newFeature, storyId);
        dispatch({type: 'ADD_FEATURE_SUCCESS', storyId: storyId, id: newFeatureId, feature: newFeature});
    },
    deleteFeature: (storyId : string, id : number): AppThunkAction < KnownAction >=> async(dispatch, getState) => {
        dispatch({type: "DELETE_FEATURE", storyId: storyId, id: id});
        await HttpClient.delete(Entity.Feature, storyId, id);
        dispatch({type: "DELETE_FEATURE_SUCCESS", storyId: storyId, id: id})
    },
    updateFeature: (storyId : string, id : number, field : string, value : string): AppThunkAction < KnownAction >=> async(dispatch) => {
        await HttpClient.put(Entity.Feature, storyId, id, field, value);
        dispatch({type:"UPDATE_FEATURE_SUCCESS",storyId:storyId, id:id, field:field, value:value })
    }
}

const unloadedState : FeatureState = {
    isLoading: false,
    features: []
}

export const reducer : Reducer < FeatureState > = (state : FeatureState, incomingAction : Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case "ADD_FEATURE":
            return {isLoading: true, storyId: action.storyId, features: state.features}
        case "ADD_FEATURE_SUCCESS":
            if (state.storyId != action.storyId) {
                return {isLoading: false, storyId: state.storyId, features: state.features}
            }
            var feature:
            Feature = {
                id: action.id,
                title: action.feature.title
            }
            return {
                isLoading: false,
                storyId: action.storyId,
                features: (state.features
                    ? state.features
                    : []).concat(feature)
            }
        case "DELETE_FEATURE":
            return {isLoading: true, storyId: state.storyId, features: state.features}
        case "DELETE_FEATURE_SUCCESS":
            if (state.storyId != action.storyId){
                return {isLoading: false, storyId: state.storyId, features: state.features} 
            }
            return {
                isLoading: false,
                storyId: state.storyId,
                features: state.features ? state.features
                    .filter(x => x.id != action.id):[]
            }
        case "FETCH_STORY":
            return {isLoading: true, storyId: action.id, features: state.features}
        case "FETCH_STORY_SUCCESS":
            return {isLoading: false, storyId: action.story.id, features: action.story.features}
        case "UPDATE_FEATURE_SUCCESS":
        
            if (action.storyId != state.storyId){
                return {isLoading: false, storyId: state.storyId, features: state.features}
            }
            const features= state.features.slice();
            const newFeature = state.features.find(x=>x.id == action.id);
            (newFeature as any)[action.field] = action.value;
            return {isLoading:false, storyId:state.storyId, features:features}
        default:
            const exhaustiveCheck:
            never = action;
    }
    return state || unloadedState;
}
