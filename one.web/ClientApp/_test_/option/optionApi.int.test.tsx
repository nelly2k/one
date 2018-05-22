import HttpClient from "../../http";
import {NotFoundError, BadRequestError} from "../../http/errors";

import {StoryDetails} from "../../story/view/model";
import {baseUrl} from "domain-task/fetch";
import {Entity} from "../../common";
import {NewOption} from "../../option/model";
import { NewStory } from "../../story/add";

describe("option api", async() => {

    beforeEach(() => {
        baseUrl("http://localhost:5000");
    })

    it("adds, updates, retrieves and deletes", async ()=>{
        var comparison :NewStory={
            title:  "my title"
        }
        var comparisonId = await HttpClient.post<NewStory,string>(Entity.Story, comparison);

        var newFeature  :NewOption={
            title:"feature title"
        }
        var newFeatureId = await HttpClient.post<NewOption,number>(Entity.Option, newFeature, comparisonId);

        var newFeatureTitle = "new feature title";
        await HttpClient.put(Entity.Option, comparisonId, newFeatureId, "Title", newFeatureTitle);

        var fetchedFeatures = await HttpClient.get<NewOption[]>(Entity.Option, comparisonId);
        
        expect(fetchedFeatures[0].title).toBe(newFeatureTitle);
    
        await HttpClient.delete(Entity.Option, comparisonId, newFeatureId);
        await HttpClient.delete(Entity.Story, comparisonId);
    })
});