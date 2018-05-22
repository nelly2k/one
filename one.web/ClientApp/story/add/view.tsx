import * as StoryStore from "../storyStore"
import { RouteComponentProps } from "react-router";
import { NewStory } from ".";
import React = require("react");
import { Places } from "../../common";
import { connect } from "react-redux";
import { ApplicationState } from "../../common/store";
import { Page } from "../../common/page";

type StoryProps =
StoryStore.State
    & typeof StoryStore.actionCreators
    & RouteComponentProps<{}>;
    
class AddStory extends React.Component<StoryProps, any>{
    title:string="";


    handleClick=()=>{
        var newStory:NewStory = {title:this.title};
        this.props.addStory(newStory);
        this.props.history.push(Places.home.getUrl())
    }
    render(){
        return <Page places={[Places.home, Places.newStory]}>
            <input onChange={t=>this.title= t.target.value}/>
            <button onClick={this.handleClick}>Add Story</button>
        </Page>
    }
}

export default connect(
    (state:ApplicationState) => state.story,
    StoryStore.actionCreators
)(AddStory)