import * as React from "react";
import * as FeatureStore from "../store";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../common/store";
import { Page } from "../../common/page";
import { Places } from "../../common";
import { connect } from "react-redux";
import { NewFeature } from "./model";


type AddFeatureProps = 
    FeatureStore.FeatureState
    & typeof FeatureStore.actionCreator
    & RouteComponentProps<{storyId:string}>;

class AddFeature extends React.Component<AddFeatureProps>{
    title:string = "";

    handleClick=()=>{
        var newFeature:NewFeature ={
            title:this.title
        } 
        const storyId = this.props.match.params.storyId;
        this.props.addNewFeature(storyId,newFeature);
        this.props.history.push(Places.story.withParams(storyId).getUrl());
    }
    
    render(){
        return <Page places={[Places.home, Places.story, Places.newFeature]}>
        <input onChange={x=>this.title = x.target.value}></input>
        <button onClick={this.handleClick}>Add Feature</button>
        </Page>
    }
}

export default connect(
        (state:ApplicationState)=>state.feature,
        FeatureStore.actionCreator
    )(AddFeature);