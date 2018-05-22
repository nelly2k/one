import {AreEqual} from "../../common/service"

describe("are equal tests",()=>{

    it("equals simple string", ()=>{
        var a1:A = {prop1:"blah"};
        var a2:A = {prop1:"blah"};

        expect(AreEqual(a1,a2)).toBe(true);
    })

    it("equals by case simple string", ()=>{
        var a1:A = {prop1:"blah"};
        var a2:A = {prop1:"Blah"};

        expect(AreEqual(a1,a2)).toBe(false);
    })

    it("unequals deep object", ()=>{
        var a1:A = {prop1:"blah"};
        var a2:A = {prop1:"Blah"};
        var b1:B = {prop1:"blah", prop2:a1};
        var b2:B = {prop1:"blah", prop2:a2};

        expect(AreEqual(b1,b2)).toBe(false);
    })

    it("equals deep object", ()=>{
        var a1:A = {prop1:"blah1"};
        var a2:A = {prop1:"blah1"};
        var b1:B = {prop1:"blah", prop2:a1};
        var b2:B = {prop1:"blah", prop2:a2};

        expect(AreEqual(b1,b2)).toBe(true);
    })

});

interface A{
    prop1:string;
}

interface B{
    prop1:number|string;
    prop2:A;
}