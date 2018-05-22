import * as React from "react";
import * as OptionStore from "../optionStore";
import { RouteComponentProps } from "react-router";
import { NewOption } from "../model";
import { Places } from "../../common";
import { Page } from "../../common/page";
import { connect } from "react-redux";
import { ApplicationState } from "../../common/store";
type AddOptionProps =
    OptionStore.OptionState
    & typeof OptionStore.actionCreater
    & RouteComponentProps<{storyId:string}>;

class AddOption extends React.Component<AddOptionProps>{
    title:string = "";

    handleClick=()=>{
        var option:NewOption={
            title:this.title
        };

        const storyId = this.props.match.params.storyId;
        this.props.addOption(storyId, option);
        this.props.history.push(Places.story.withParams(storyId).getUrl());
    }

    render(){
        return <Page places={[Places.home, Places.story, Places.newOption]}>
        <input onChange={x=>this.title = x.target.value}/>
        <button onClick={this.handleClick} >Add Option</button>
        </Page>
    }

}
    
export default connect(
    (state:ApplicationState)=>state.option,
    OptionStore.actionCreater
)(AddOption)