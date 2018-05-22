import * as Store from "../../story/storystore";
import { State  } from "../../story/storystore";
import { AddStoryAction,AddStorySuccessAction } from "../../story/storyActions";
import HttpClient from "../../http";
import { NewStory } from "../../story/add";

const title = "My new Story";
const newStoryId: string = "newStoryId";
const newStory: NewStory = {
    title: title
};

describe("Add story reducer state update",()=>{
    it("updates isLoading on ADD_STORY", () => {
        var state = {} as State;
        var action = {
            type: "ADD_STORY",
            story: newStory

        } as AddStoryAction;

        var newState = Store.reducer(state, action);

        expect(newState.isLoading).toBe(true);
    });

    it("sets story from state on ADD_STORY", () => {
        var state = {story:{ title:"existing"}} as State;
        var action = {
            type: "ADD_STORY",
            story: newStory

        } as AddStoryAction;

        var newState = Store.reducer(state, action);
        
        expect(newState.story!.title).toBe("existing");
    });

    it("updates isLoading on ADD_COMPARISON_SUCCESS", () => {
        var state = {} as State;
        var action = {
            type: "ADD_STORY_SUCCESS",
            story: newStory

        } as AddStorySuccessAction;

        var newState = Store.reducer(state, action);

        expect(newState.isLoading).toBe(false);
    });

    it("sets comparison from action on ADD_COMPARISON_SUCCESS", () => {
        var state = {story:{ title:"existing"}} as State;
        var action = {
            type: "ADD_STORY_SUCCESS",
            story: newStory

        } as AddStorySuccessAction;

        var newState = Store.reducer(state, action);

        expect(newState.story!.title).toBe(title);
    });

})