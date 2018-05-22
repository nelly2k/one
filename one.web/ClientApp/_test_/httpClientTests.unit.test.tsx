import HttpClient from "../http";

describe("HttpClient tests",()=>{
    it("builds url without parameters", ()=>{
        var url = HttpClient.BuildUrl("comparison",[]);
        expect(url).toBe("/api/comparison");
    })

    it("builds url with one parameter", ()=>{
        var url = HttpClient.BuildUrl("comparison", ["guid"]);
        expect(url).toBe("/api/comparison/guid");
    })

    it("build url with two parameters",()=>{
        var url = HttpClient.BuildUrl("comparison", ["guid","another"]);
        expect(url).toBe("/api/comparison/guid/another");
    });

    it("builds url with numbers", ()=>{
        var url = HttpClient.BuildUrl("comparison", ["guid",10]);
        expect(url).toBe("/api/comparison/guid/10");
    });

    it("doesn't build nullable", ()=>{
        const tmp = new Temp();
        tmp.strValue = "Blah";
        tmp.numValue = 2;
        const qs = HttpClient.BuildQueryFromObject<Temp>(tmp);
        expect(qs).toBe("strValue=Blah&numValue=2")
    })

    it("builds query string from object", ()=>{
        const tmp = new Temp();
        tmp.strValue = "Blah";
        tmp.numValue = 2;
        tmp.nullNumValue = 4;
      const qs = HttpClient.BuildQueryFromObject<Temp>(tmp);
      expect(qs).toBe("strValue=Blah&numValue=2&nullNumValue=4")
    })

    class Temp {
        strValue:string = "";
        numValue:number=0;
        nullNumValue?:number;
    }
})