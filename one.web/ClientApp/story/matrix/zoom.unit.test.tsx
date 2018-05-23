import * as React from "react";
import * as  Adapter from "enzyme-adapter-react-16";
import * as Enzyme from 'enzyme';
import { Zoom } from "./zoom";

describe("zoom unit tests", () => {
    let render: Enzyme.ShallowWrapper<any, any>;
    let minusButton: Enzyme.ShallowWrapper<any, any>;
    let plusButton: Enzyme.ShallowWrapper<any, any>;
    let zoom: Zoom;
    let onPlusMock: jest.Mock;
    let onMinusMock: jest.Mock;

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() });
    });

    beforeEach(() => {
        onPlusMock = jest.fn();
        onMinusMock = jest.fn();
        render = Enzyme.shallow(<Zoom onPlus={onPlusMock} onMinus={onMinusMock}
            min={1} max={3} value={2} />);
        zoom = render.instance() as Zoom;

        minusButton = render.find("button").first();
        plusButton = render.first().at(1);
    })

    it("state is set on mount", () => {
        expect(zoom.state.curr).toBe(2);
    });

    it.only("decrease index on press minus", () => {
        
        minusButton.simulate("click");
        expect(zoom.state.curr).toBe(1);
    });

    it("increase index on press plus", () => {
        plusButton.simulate("click");
        expect(zoom.state.curr).toBe(3);
    });

    it("called onMinus when pressed ", () => {
        minusButton.simulate("click");
        expect(onMinusMock.mock.calls.length).toBe(1);
    });

    it("called onPlus when pressed ", () => {
        plusButton.simulate("click");
        expect(onPlusMock.mock.calls.length).toBe(1);
    });

    it("cannot minus if minimum", () => {
        zoom.setState({ curr: 1 });
        expect(zoom.canMinus()).toBe(false);
    });

    it("can minus if not minimum", () => {
        zoom.setState({ curr: 2 });
        expect(zoom.canMinus()).toBe(true);
    });

    it("cannot plus if maximum", () => {
        zoom.setState({ curr: 3 });
        expect(zoom.canPlus()).toBe(false);
    });

    it("can plus if not maximum", () => {
        zoom.setState({ curr: 1 });
        expect(zoom.canPlus()).toBe(true);
    });
});