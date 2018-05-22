import * as Store from "../../feature/store";
import { Feature } from "../../feature/list/model";
describe("delete feature reducer", ()=>{

    it("sets isLoading on request", ()=> {
        const state = {} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE"};
        const newState = Store.reducer(state, action);
        expect(newState.isLoading).toBe(true);
    });

    it("sets story id on request", ()=> {
        const state = {storyId:"story id"} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE"};
        const newState = Store.reducer(state, action);
        expect(newState.storyId).toBe("story id");
    });

    it("sets features on request", ()=> {
        const state = {features:[{id:4}]} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE"};
        const newState = Store.reducer(state, action);
        expect(newState.features[0].id).toBe(4);
    });

    it("sets isLoading on success", ()=> {
        const state = {} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE_SUCCESS"};
        const newState = Store.reducer(state, action);
        expect(newState.isLoading).toBe(false);
    });

    it("sets story id on success if story id the same", ()=> {
        const state = {storyId:"4"} as Store.FeatureState;
        const action = {
            type:"DELETE_FEATURE_SUCCESS",
            storyId:"4"
        
        };
        const newState = Store.reducer(state, action);
        expect(newState.storyId).toBe("4");
    });

    it("retain story id", ()=> {
        const state = {storyId:"4"} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE_SUCCESS", storyId:"5"};
        const newState = Store.reducer(state, action);
        expect(newState.storyId).toBe("4");    
    });

    it("doesn't remove feature if different story id", ()=> {
        const state = {storyId:"4", 
            features:[{id:5}]} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE_SUCCESS",
            id:5};
        const newState = Store.reducer(state, action);
        expect(newState.features[0].id).toBe(5);
    });

    it("removes feature", ()=> {
        const state = {storyId:"4", 
            features:[{id:5}]} as Store.FeatureState;
        const action = {type:"DELETE_FEATURE_SUCCESS",
            storyId:"4",
            id:5};
        const newState = Store.reducer(state, action);
        expect(newState.features.length).toBe(0);
    });
});