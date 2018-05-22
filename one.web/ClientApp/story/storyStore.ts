import { AppThunkAction } from "../common/store";
import { Action, Reducer, ActionCreator } from 'redux';
import HttpClient from "../http";
import { Entity, IDictionary } from "../common";
import { StoryDetails, StoryFull } from "./view/model"
import { KnownAction, FetchStoryAction, FetchStorySuccessAction, FetchStoryFailAction, AddStoryAction, AddStorySuccessAction } from "./storyActions"
import {NewStory} from "./add"
import { NotFoundError } from "../http/errors";

export interface State {
    isLoading: boolean;
    story?: StoryDetails;
    isNotFound?:boolean;
}

export const actionCreators = {
    fetchStory: (id: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'FETCH_STORY', id: id});
      try{
        let data = await HttpClient.get<StoryFull>(Entity.Story, id);
        const state = getState();
        if (state.story.story && data.id != state.story.story.id){
            return; //TODO come up with better solution
        }

        dispatch({ type: 'FETCH_STORY_SUCCESS', id: id, story: data });
      }catch(e){
          if (e instanceof NotFoundError){
              dispatch({type:"FETCH_STORY_FAIL", id:id, message: "Story isn't found"})
        }
      }
       
    },
    addStory: (newStory : NewStory): AppThunkAction < KnownAction > => async(dispatch, getState) => {
        dispatch({type: 'ADD_STORY', story: newStory});
        var newId = await HttpClient.post<NewStory, string>(Entity.Story, newStory);
        dispatch({type: 'ADD_STORY_SUCCESS', id: newId, story: newStory});
    }
}

const unloadedState: State = {
    isLoading: true
};

export const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch(action.type){
        case "FETCH_STORY": return willFetchStory(state, action);
        case "FETCH_STORY_SUCCESS": return storyFetched(state,action);
        case "FETCH_STORY_FAIL": return fetchStoryFailed(state,action);
        case "ADD_STORY": return willAddStory(state,action);
        case "ADD_STORY_SUCCESS": return  storyAdded(state,action);
        default: const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}

const willFetchStory=(state:State, action:FetchStoryAction):State=>{
    return {isLoading: true, story: state.story }
}

const storyFetched =(state:State, action:FetchStorySuccessAction):State=>{
    const currentStory: StoryDetails = {
        id:action.story.id,
        title:action.story.title
    }
    return {isLoading: false, story: currentStory}
}

const fetchStoryFailed =(state:State, action:FetchStoryFailAction) =>{
    console.log(state.story)
    return {isLoading:false, story:state.story, isNotFound:true}
}

const willAddStory =(state:State, action:AddStoryAction) =>{
    return {isLoading: true, story: state.story}
}

const storyAdded =(state:State, action:AddStorySuccessAction) =>{
    var story:StoryDetails={
        title:action.story.title,
        id:action.id
    }    
    return {isLoading: false, story: story}
}