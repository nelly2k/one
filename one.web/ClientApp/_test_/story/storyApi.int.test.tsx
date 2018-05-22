import HttpClient from "../../http";
import { NotFoundError, BadRequestError } from "../../http/errors";
import { StoryDetails } from "../../story/view/model";
import { baseUrl } from "domain-task/fetch";
import { Entity } from "../../common";

import {NewFeature} from "../../feature/add/model";
import { NewStory } from "../../story/add";

describe("comparison api", async () => {

    beforeEach(() => {
        baseUrl("http://localhost:52524");
    })

    it("get not found error", async () => {
        let error: any;
        try {
            await HttpClient.get<StoryDetails>(Entity.Story, "c5bdeccf-2dce-4d08-dfc0-08d57e342a85");
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(NotFoundError);
        expect((error as NotFoundError).entity).toBe("comparison");
    })

    it("adds null title responded with bad request", async () => {
        let error: any;
        const newComparison: NewStory = {
            title: ""
        }
        try {
            var t= await HttpClient.post<NewStory, string>(Entity.Story, newComparison);
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(BadRequestError);
    });

    it("adds, retrieves and deletes", async () => {
        const name = "Brand new comparison8";
        const newComparison: NewStory = {
            title: name
        }
        var newComparisonId = await HttpClient.post<NewStory, string>(Entity.Story, newComparison);

        var fetchedComparison = await HttpClient.get<StoryDetails>(Entity.Story, newComparisonId);
        expect(fetchedComparison.title).toBe(name);

        await HttpClient.delete(Entity.Story, newComparisonId);
    });

    it("adds, updates, deletes", async () => {
        const name = "Brand new comparison5";
        const nameNew = "Updated comparison5";
        const newComparison: NewStory = {
            title: name
        }
        var newComparisonId = await HttpClient.post<NewStory, string>(Entity.Story, newComparison);

        await HttpClient.put(Entity.Story, newComparisonId, "Title", nameNew);

        var fetchedComparison = await HttpClient.get<StoryDetails>(Entity.Story, newComparisonId);
        expect(fetchedComparison.title).toBe(nameNew);

        await HttpClient.delete(Entity.Story, newComparisonId);
    })

})