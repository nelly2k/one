import { FeatureState } from "../../feature/store";
import * as Store from "../../feature/store";
import { NewFeature } from "../../feature/add/model";

describe("add feature request reducer", ()=>{
        const newFeature:NewFeature = {
            title:"New Feature"
        }
        const state = {features:[{id:4}]} as FeatureState;

        const getNewState = ():FeatureState=>{
            const action = {
                type:"ADD_FEATURE",
                storyId:"story id",
                feature:newFeature
            }
            return  Store.reducer(state,action);
        }
        it("updates isloading on add request",()=>{
            expect(getNewState().isLoading).toBe(true);
        })

        it("sets curent story id",()=>{
            expect(getNewState().storyId).toBe("story id");
        });

        it("retains feature list", ()=>{
            expect(getNewState().features[0].id).toBe(4);
        })

    })

describe("add feature respond reducer",()=>{
    const storyId="story id";
    const differentStoryId= "different story id";
    const getNewState=(state:FeatureState)=>{
        const action = {
            type:"ADD_FEATURE_SUCCESS",
            feature:{title:"new feature"},
            id:4,
            storyId:storyId
        };
        return Store.reducer(state, action);
    }

    it("sets isLading to false, the same story", ()=>{
        expect(getNewState({storyId:storyId}as FeatureState).isLoading)
            .toBe(false);
    })

    it("sets isLoading to false, different story", ()=>{
        expect(getNewState({storyId:"different story id"}as FeatureState).isLoading)
            .toBe(false);
    })

    it("retains story id, for different story", ()=>{
        expect(getNewState({storyId:differentStoryId}as FeatureState).storyId)
        .toBe(differentStoryId);
    })

    it("passes story id for the same story", ()=>{
        expect(getNewState({storyId:storyId}as FeatureState).storyId)
        .toBe(storyId);
        
    })

    it("doesn't add feature for different story",()=>{
        const state:FeatureState={
            storyId:differentStoryId,
            features:[{id:5}]
        } as FeatureState;
        expect(getNewState(state).features.length).toBe(1);
    })

    it("adds feature for story", ()=>{
        const state:FeatureState={
            storyId:storyId,
            features:[{id:5}]
        } as FeatureState;
        expect(getNewState(state).features[1].id).toBe(4);
    })
})