import * as Store from "../../feature/store";
import HttpClient from "../../http";

describe("delete feature action",()=>{
    const dispatch = jest.fn();
    const getState = jest.fn();
    const storyId = "story id";
    const id=10;

    beforeEach(()=>{
        dispatch.mockClear();
        HttpClient.delete= jest.fn(fn=>
            new Promise<void>(resolve=>resolve()))
    })

    it("dispatches type request",async ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[0][0].type).toBe("DELETE_FEATURE");
    });

    it("dispatches story id on request",async  ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[0][0].storyId).toBe(storyId);
    })

    it("dispatches id on request",async  ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[0][0].id).toBe(id);
    })

    it("dispatches type response",async ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[1][0].type).toBe("DELETE_FEATURE_SUCCESS");
    });

    it("dispatches story id on response",async  ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[1][0].storyId).toBe(storyId);
    })

    it("dispatches id on response",async  ()=>{
        await Store.actionCreator.deleteFeature(storyId,id)(dispatch,getState);
        expect(dispatch.mock.calls[1][0].id).toBe(id);
    })

    
})