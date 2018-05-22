import { IDictionary } from "../../common";

describe("IDictionary exploration",()=>{
    it("adds item", ()=>{
        var items = {}as IDictionary<string>;
        items['hellokey'] = 'hellowvalue';
        expect(items['hellokey']).toBe('hellowvalue');
    });

    it('returns undefined if not exists',()=>{
        var items:IDictionary<string>={};
        items["key"]="value";
        expect(items["value"]).toBeUndefined();
    })

    it("creates bulk", ()=>{
        var items:IDictionary<string>={
            "key":"value",
            "key2":"value2"
        }

        expect(items["key2"]).toBe("value2");
    });
})