import * as Store from "../../feature/store"
describe("Fetch story reducer",()=>{

    it("sets loading to true", ()=>{
        var state={} as Store.FeatureState;
        var action = {type:"FETCH_STORY"};
        expect(Store.reducer(state, action).isLoading).toBe(true);
    })
    
    it("sets loading to false", ()=>{
        var state={} as Store.FeatureState;
        var action = {type:"FETCH_STORY_SUCCESS"};
        expect(Store.reducer(state, action).isLoading).toBe(false);
    })
})