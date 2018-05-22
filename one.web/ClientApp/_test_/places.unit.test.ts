import {BasePlace} from "../common";

describe("Build url from path and parameters", () => {

    it("has no parameters given, returns path", () => {
        var place = new BasePlace("title", "blah/:id");

        expect(place.getUrl()).toBe("blah/:id");
    });

    it("has no parameters in path, returns path", () => {
        var place = new BasePlace("title", "blah");

        expect(place.withParams("blah").getUrl()).toBe("blah");
    });

    it("build one param", () => {
        var place = new BasePlace("title", "blah/:id");

        expect(place.withParams("blahId").getUrl()).toBe("blah/blahId");
    });

    it("builds param in the middle", () => {
        var place = new BasePlace("title", "story/:storyId/feature");
        expect(place.withParams("muParam").getUrl()).toBe("story/muParam/feature");
    })

    
    it("builds query for three params",()=>{
        var place = new BasePlace("title", "story/:storyId/:featureId/:optionId");
        expect(place.withParams("id1", 2, "id2").getUrl()).toBe("story/id1/2/id2");
    })

})