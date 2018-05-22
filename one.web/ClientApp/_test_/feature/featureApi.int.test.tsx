import HttpClient from "../../http";
import {NotFoundError, BadRequestError} from "../../http/errors";
import {StoryDetails} from "../../story/view/model";
import {baseUrl} from "domain-task/fetch";
import {Entity} from "../../common";
import {NewFeature} from "../../feature/add/model";
import { NewStory } from "../../story/add";

describe("feature api", async() => {

    beforeEach(() => {
        baseUrl("http://localhost:5000");
    })

    it("adds, updates, retrieves and deletes", async ()=>{
        var comparison :NewStory={
            title:  "my title"
        }
        var comparisonId = await HttpClient.post<NewStory,string>(Entity.Story, comparison);

        var newFeature  :NewFeature={
            title:"feature title"
        }
        var newFeatureId = await HttpClient.post<NewFeature,number>(Entity.Feature, newFeature, comparisonId);

        var newFeatureTitle = "new feature title";
        await HttpClient.put(Entity.Feature, comparisonId, newFeatureId, "Title", newFeatureTitle);

        var fetchedFeatures = await HttpClient.get<NewFeature[]>(Entity.Feature, comparisonId);
        expect(fetchedFeatures[0].title).toBe(newFeatureTitle);
    
        await HttpClient.delete(Entity.Feature, comparisonId, newFeatureId);
        await HttpClient.delete(Entity.Story, comparisonId);
    })
});