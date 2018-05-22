import * as Store from "../../story/searchstore";
import { State } from "../../story/searchstore";
import { RequestSearchAction, ReceiveSearchAction, SearchResponse, SearchRequest,Story } from "../../story/list";
import HttpClient from "../../http";

describe("comparison list reducer tests", ()=>{
   it("")

});

describe("comparison list action tests", () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => {
        dispatch.mockClear();
    })

    const runAction = async (searchRequest: SearchRequest, searchResponse: SearchResponse): Promise<any> => {
        HttpClient.get = jest.fn(fn => {
            return new Promise<SearchResponse>(resolve => {
                resolve(searchResponse);
            })
        });

        const result = Store.actionCreators.search(searchRequest);
        await result(dispatch, getState);
        return dispatch.mock.calls[0][0];
    }

    it("dispatches type when action is called", async () => {
        var dispatched = await runAction({} as SearchRequest, {} as SearchResponse);
        expect(dispatched.type).toBe("SEARCH_SUCCESS");
    });

    it("dispatches search request", async () => {
        const searchTerm = "search term";
        const dispatched = await runAction({ term: searchTerm } as SearchRequest, {} as SearchResponse);
        expect(dispatched.searchRequest.term).toBe(searchTerm);
    });

    it("dispatches comparisons", async () => {
        const comparisonId = "newId";
        const comparison = {id:comparisonId} as Story;
        const dispatched = await runAction({ } as SearchRequest, {stories:[comparison]} as SearchResponse);
        expect(dispatched.stories[0].id).toBe(comparisonId);
    });
});