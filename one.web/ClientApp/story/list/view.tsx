import * as SearchStory from "../searchStore";
import {State} from "../searchStore";
import { RouteComponentProps } from "react-router";
import * as React from "react";
import { SearchRequest } from "./model";
import { Link } from "react-router-dom";
import { Places } from "../../common";
import { ApplicationState } from "../../common/store";
import { connect } from "react-redux";
import { Page } from "../../common/page";

type StoriesProps =
    SearchStory.State
    & typeof SearchStory.actionCreators
    & RouteComponentProps<{}>;

class Stories extends React.Component<StoriesProps, {}>{
    constructor(props:StoriesProps){
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillMount() {
        
        this.props.search({} as SearchRequest);
    }

    handleInput=(term:string)=>{
        var request = term?{term:term} as SearchRequest:{} as SearchRequest; 
        this.props.search(request)
    }

    render() {
        return <Page>
     
            <div className="grid-x">
            <div className="cell small 12 ">
            <input onChange={t=>this.handleInput(t.target.value)} /> 
            </div>
                <div className="cell small-12 medium-4 large-3">
                    <Link to={Places.newStory.getUrl()}>Add</Link>
                </div>
                {this.props.stories && this.props.stories!.map((val => <div className="cell small-12 medium-4 large-2" key={val.id}>
                    <h2>{val.title}</h2>
                    <p>Feature: {val.featuresNumber}</p>
                    <p>Options: {val.optionsNumber}</p>
                    <Link to={Places.story.withParams(val.id).getUrl()}>View</Link>

                </div>))}
            </div>

        </Page>
    }
}
export default connect(
    (state: ApplicationState) => state.search,
    SearchStory.actionCreators
)(Stories);
