import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { IconButton } from "./button";

describe("button tests", ()=>{

    beforeAll(()=>{
        Enzyme.configure({adapter:new Adapter()});
    });

    it("disables button", ()=> {
        const onClick:jest.Mock = jest.fn();
        const render = Enzyme.shallow(<IconButton disabled={true} onClick={onClick}>Icon here</IconButton>)
        expect(render.html()).toContain("disabled");
    })

    it.skip("restrict click on disabled", ()=> {
        const onClick:jest.Mock = jest.fn();
        const render = Enzyme.shallow(<IconButton disabled={true} onClick={onClick}>Icon here</IconButton>)
        render.simulate("click");
        expect(onClick).not.toBeCalled();

    });

    it("enables button", ()=> {
        const onClick:jest.Mock = jest.fn();
        const render = Enzyme.shallow(<IconButton disabled={false} onClick={onClick}>Icon here</IconButton>)
        expect(render.html()).not.toContain("disabled");
    });
})