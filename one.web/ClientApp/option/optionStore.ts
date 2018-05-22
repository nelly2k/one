import { AppThunkAction } from "../common/store";
import { Action, Reducer, ActionCreator } from 'redux';
import HttpClient from "../http";
import { KnownOptionAction } from "./optionActions";
import { Entity } from "../common";
import { Option, NewOption } from "./model";
import { FetchStoryAction, FetchStorySuccessAction } from "../story/storyActions";

export interface OptionState {
    isLoading: boolean;
    storyId?: string;
    options: Option[];
}

export const actionCreater = {
    addOption: (storyId: string, newOption: NewOption): AppThunkAction<KnownOptionAction> =>
        async (dispatch, getState) => {
            var newOptionId = await HttpClient.post<NewOption, number>(Entity.Option, newOption, storyId);
            dispatch({ type: "ADD_OPTION_SUCCESS", storyId: storyId, id: newOptionId, option: newOption });
        },
    updateOption:(storyId:string, optionId:number, value:string):AppThunkAction<KnownOptionAction>=>
        async(dispatch, getState)=>{
            await HttpClient.put(Entity.Option, storyId, optionId, "title", value);
            dispatch({type:"UPDATE_OPTION_SUCCESS", 
                storyId:storyId, optionId:optionId, title:value})
        },
    deleteOption: (storyId: string, id: number): AppThunkAction<KnownOptionAction> =>
        async (dispatch, getState) => {
            await HttpClient.delete(Entity.Option, storyId, id);
            dispatch({ type: "DELETE_OPTION_SUCCESS", storyId: storyId, id: id });
        }
}

const unloadedState: OptionState = {
    isLoading: false,
    options:[]
}
type KnownAction = KnownOptionAction | FetchStoryAction | FetchStorySuccessAction;

export const reducer: Reducer<OptionState> = (state: OptionState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "ADD_OPTION":
            return { isLoading: true, options:state.options  };
        case "ADD_OPTION_SUCCESS":
            if (state.storyId != action.storyId){
                return {isLoading:false,storyId:state.storyId, options:state.options };
            }
            const option:Option = {
                title:action.option.title,
                id:action.id
            }
            return { isLoading: false, 
                storyId:state.storyId,
                options:(state.options? state.options:[]).concat(option)
            };
        case "DELETE_OPTION":
            return { isLoading: true, options:state.options };
        case "DELETE_OPTION_SUCCESS":
            return { isLoading: false, options:state.options  };
        case "UPDATE_OPTION":
            return { isLoading: true, options:state.options   };
        case "UPDATE_OPTION_SUCCESS":
            if (action.storyId != state.storyId){
                return {isLoading:false, storyId:state.storyId, options:state.options}
            }

            const options = state.options.slice();
            const newOption =  options.find(x=>x.id == action.optionId) as Option;
            newOption.title = action.title;

            return { isLoading: false, options:options, storyId:state.storyId};
        case "FETCH_STORY":
            return { isLoading: true, storyId: action.id, options: state.options }
        case "FETCH_STORY_SUCCESS":
            return { isLoading: false, storyId:action.story.id, options:action.story.options }
 
        default:
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
}