import * as Store from "../../feature/store";
import {FeatureState} from "../../feature/store";
import {NewFeature} from "../../feature/add/model";
import HttpClient from "../../http";

const newFeature : NewFeature = {
    title: "new Feature"
}
const newFeautureId = 10;
const storyId = "new story id";

describe("Add Feature action dispatching", () => {
    var dispatch = jest.fn();
    var getState = jest.fn();
    const execute = async(callNum : number) : Promise < any >=> {
        await Store
            .actionCreator
            .addNewFeature(storyId, newFeature)(dispatch, getState);
        return dispatch.mock.calls[callNum][0];
    }
    beforeEach(() => {
        dispatch.mockClear();
        HttpClient.post = jest.fn(fn => new Promise < number > (resolve => resolve(newFeautureId)))
    })

    it("dispatches ADD_FEATURE action type on request", async() => {
        expect((await execute(0)).type).toBe("ADD_FEATURE");
    })

    it("dispatches story id on request", async() => {
        expect((await execute(0)).storyId).toBe(storyId);
    })

    it("dispatches feature on request",async ()=>{
        expect((await execute(0)).feature.title).toBe("new Feature");
    })

    it("dispatches type on success",async ()=>{
        expect((await execute(1)).type).toBe("ADD_FEATURE_SUCCESS");
    })

    it ("dispatches story id on success", async ()=>{
        expect((await execute(1)).storyId).toBe(storyId);
    })

    it ("dispatches feature title on success", async ()=>{
        expect((await execute(1)).feature.title).toBe("new Feature");
    })

    it ("dispatches new feature id on success", async ()=>{
        expect((await execute(1)).id).toBe(newFeautureId);
    })
})