import {State} from "../../story/storyStore";
import * as Store from "../../story/storystore";
import { FetchStoryAction } from "../../story/storyActions";
describe("Fetch story reducer", ()=>{
    it("sets IsLoading to true on FETCH_STORY",()=>{
        var state = {} as State;
        var action = {
            type: "FETCH_STORY",
            id: "id"

        } as FetchStoryAction;

        var newState = Store.reducer(state, action);
        expect(newState.isLoading).toBe(true);
    });

    
});