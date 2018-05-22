import {NewStory} from "../../story/add";
import HttpClient from "../../http";
import {NewFeature} from "../../feature/add/model";
import {Entity} from "../../common";
import {baseUrl} from "domain-task";
import {NewOption} from "../../option/model";

describe("seed stories with features", () => {
    beforeEach(() => {
        baseUrl("http://localhost:52524");
    })
    it("seeds stories", async() => {
        for (var i = 0; i < 10; i++) {
            const newComparison : NewStory = {
                    title: `Seeded story ${i}`
                }

                var comparisonId = await HttpClient.post < NewStory,
                    string > (Entity.Story, newComparison);

                for (var f = 0; f < i; f++) {
                    const newFeature : NewFeature = {
                            title: `Seeded feature ${f}`
                        }

                        await HttpClient.post < NewFeature,
                        number > (Entity.Feature, newFeature, comparisonId);

                        const newOption : NewOption = {
                                title: `Seede option ${f}`
                            }
                            await HttpClient.post < NewOption,
                            number > (Entity.Option, newOption, comparisonId)
                        }
                    }
                })
            })
