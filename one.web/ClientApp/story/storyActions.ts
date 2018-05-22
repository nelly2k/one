import { NewStory } from "./add/model";
import { StoryFull } from "./view/model";

export interface AddStoryAction {
    type : "ADD_STORY";
    story : NewStory
}

export interface AddStorySuccessAction {
    type : "ADD_STORY_SUCCESS",
    id : string;
    story : NewStory
}


export interface FetchStoryAction {
    type : "FETCH_STORY";
    id : string;
}

export interface FetchStorySuccessAction {
    type : "FETCH_STORY_SUCCESS",
    id : string;
    story : StoryFull
}

export interface FetchStoryFailAction{
    type : "FETCH_STORY_FAIL",
    id:string,
    message:string
}

export type KnownAction = FetchStoryAction | FetchStorySuccessAction | AddStoryAction | AddStorySuccessAction | FetchStoryFailAction;