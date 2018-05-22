import { OptionValue, OptionValueType, NewOptionValue } from "./model";
import { AppThunkAction } from "../common/store";
import { KnownOptionValueAction } from "./actions";
import HttpClient from "../http";
import { Entity } from "../common";
import { Reducer, Action } from "redux";
import { FetchStorySuccessAction } from "../story/storyActions";

import * as StoryStore from "../story/storyStore";


export interface IOptionValueState {
    storyId?: string;
    values: OptionValue[];
}

export const actionCreator = {
    addOptionValue: (storyId: string, featureId: number, optionId: number, optionValue: NewOptionValue):
        AppThunkAction<KnownOptionValueAction> => async (dispatch, getState) => {

            dispatch({
                type: "ADD_VALUE",
                storyId: storyId,
                featureId: featureId,
                optionId: optionId,
                valueType: optionValue.optionValueType,
                value: optionValue.value,
            });
            var result = await HttpClient.post<NewOptionValue, number>(Entity.OptionValue, optionValue, storyId, featureId, optionId);
            
        },
    updateValue: (storyId: string, featureId: number, optionId: number, id: number, value: string): AppThunkAction<KnownOptionValueAction> =>
        async (dispatch, getState) => {

            await HttpClient.put(Entity.OptionValue, storyId, featureId, optionId, id, value);
            dispatch({
                type: "UPDATE_VALUE_SUCCESS",
                storyId: storyId,
                featureId: featureId,
                optionId: optionId,
                value: value
            });
        }
}

const unloadedState: IOptionValueState = {
    values: []
}
type KnownActions = KnownOptionValueAction | FetchStorySuccessAction;
export const reducer: Reducer<IOptionValueState> = (state: IOptionValueState, incomingAction: Action) => {
    const action = incomingAction as KnownActions;

    switch (action.type) {
        // case "ADD_VALUE_SUCCESS":
        //     if (action.storyId != state.storyId) {
        //         return { storyId: state.storyId, values: state.values };
        //     }
        //     const newoption: OptionValue = {
        //         optionValueType: action.valueType,
        //         value: action.value,
        //         featureId: +action.featureId,
        //         optionId: +action.optionId,
        //         id: +action.id,
        //         order: 1
        //     };
        //     const result = state
        //         .values
        //         .concat(newoption)
        //     return {
        //         storyId: action.storyId,
        //         values: result
        //     }
        case "ADD_VALUE":
            return { storyId: state.storyId, values: state.values };
        case "ADD_VALUE_FAIL":
            return { storyId: state.storyId, values: state.values };
        case "FETCH_STORY_SUCCESS":
            return { storyId: action.story.id, values: action.story.optionValues }
        case "UPDATE_VALUE_SUCCESS":
            if (action.storyId != state.storyId) {
                return { storyId: state.storyId, values: state.values };
            }
            const values = state.values;
            const value = values.find(x => x.featureId == action.featureId && x.optionId == x.optionId);
            if (!value) {
                return { storyId: state.storyId, values: state.values };
            }
            value.value = action.type;
            return { storyId: action.storyId, values: values };
        default:
            const exhaustiveCheck:
                never = action;

    }

    return state || unloadedState;
}