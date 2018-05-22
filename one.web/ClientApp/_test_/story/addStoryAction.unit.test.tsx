import * as Store from "../../story/storystore";
import { State  } from "../../story/storystore";
import { AddStoryAction,AddStorySuccessAction } from "../../story/storyActions";
import HttpClient from "../../http";
import { NewStory } from "../../story/add";


const title = "Story";
const newComparisonId: string = "newStoryId";
const newComparison: NewStory = {
    title: title
};

describe("Add story action dispatching", () => {
    var dispatch = jest.fn();
    var getState = jest.fn();

    beforeEach(() => {
        dispatch.mockClear();
        HttpClient.post = jest.fn(fn => {
            return new Promise<string>(resolve =>resolve(newComparisonId))
        })
    });

    it("dispatches ADD_STORY action on featch request", async ()=>{
        var result = Store.actionCreators.addStory(newComparison);
        await result(dispatch, getState);
        var dispatched = dispatch.mock.calls[0][0];
        expect(dispatched.type).toBe("ADD_STORY");
    });

    it("dispatches story details on featch request", async ()=>{
        var result = Store.actionCreators.addStory(newComparison);
        await result(dispatch, getState);
        var dispatched = dispatch.mock.calls[0][0];
        expect(dispatched.story.title).toBe(title);
    });

    it("dispatches ADD_STORY_SUCCESS action on featch response", async ()=>{
        var result = Store.actionCreators.addStory(newComparison);
        await result(dispatch, getState);
        var dispatched = dispatch.mock.calls[1][0];
        expect(dispatched.type).toBe("ADD_STORY_SUCCESS");
    });

    it("dispatches new id on featch response", async ()=>{
        var result = Store.actionCreators.addStory(newComparison);
        await result(dispatch, getState);
        var dispatched = dispatch.mock.calls[1][0];
        expect(dispatched.id).toBe(newComparisonId);
    });

    it("dispatches story details on featch response", async () => {
        var result = Store.actionCreators.addStory(newComparison);
        await result(dispatch, getState);

        var dispatched = dispatch.mock.calls[1][0];
        expect(dispatched.story.title).toBe(title);
    });

})