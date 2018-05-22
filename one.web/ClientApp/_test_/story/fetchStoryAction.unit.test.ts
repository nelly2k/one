import * as Store from "../../story/storyStore";
import { StoryFull } from "../../story/view";
import HttpClient from "../../http";

describe("Fetch story actions tests", ()=>{
    var dispatch = jest.fn();
    var getState = jest.fn();

    const execute= async (num:number):Promise<any> =>{
        await(await Store.actionCreators.fetchStory("fetchedId"))(dispatch, getState);
        return dispatch.mock.calls[num][0];
    }

    const story: StoryFull = {
        title: "story title",
        id:"story_id",
        features:[],
        options:[],
        optionValues:[]
    };

    beforeEach(()=>{
        dispatch.mockClear();
        HttpClient.get = jest.fn(fn=>{
            return new Promise<StoryFull>(resolve=>resolve(story));
        })
    })

    it("despatches FETCH_STORY on fetch", async ()=>{
        expect((await execute(0)).type).toBe("FETCH_STORY");
    })

    it("despatches id on fetch", async ()=>{
        expect((await execute(0)).id).toBe("fetchedId");
    })

    it("despatches FETCH_STORY_SUCCESS on fetch response", async ()=>{
        expect((await execute(1)).type).toBe("FETCH_STORY_SUCCESS");
    })

    it("despatches id on fetch response", async ()=>{
        expect((await execute(1)).id).toBe("fetchedId");
    })

    it("despatches story details on fetch response", async ()=>{
        expect((await execute(1)).story.title).toBe("story title");
    })
})
