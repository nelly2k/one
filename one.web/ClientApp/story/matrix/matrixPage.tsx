import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../common/store";
import * as StoryStore from "../storyStore";
import * as FeatureStore from "../../feature/store";
import * as OptionStore from "../../option/optionStore";
import { RouteComponentProps } from "react-router";
import { Page } from "../../common/page";
import { Places } from "../../common";
import { StoryDetails } from "../view";
import { ArrowHandle } from "./arrowHandle";

type MatrixProps = 
    ApplicationState
    & typeof StoryStore.actionCreators
    & typeof FeatureStore.actionCreator
    & typeof OptionStore.actionCreater
    & RouteComponentProps<{ id: string }>;

class MatrixStoryView extends React.Component<MatrixProps>{
    
    componentWillMount():void {
        this.props.fetchStory(this.props.match.params.id);
    }

    getTitle(details: StoryDetails | undefined): string {
        if (!details) {
            return "";
        } else {
            return details.title;
        }
    }

    render():JSX.Element{
        return <Page className="matrix" places={[Places.home, Places.story.withTitle(this.getTitle(this.props.story.story))]}>
        <ArrowHandle isLeft={true} value={36} onClick={()=>console.log("left")}/>
        
        <div className="grid-x">middle</div>
        <ArrowHandle isLeft={false} value={3} onClick={()=>console.log("right")}/>
        
        </Page>
    }

}    

export default connect(
    (state: ApplicationState) => state,
    Object.assign(StoryStore.actionCreators, FeatureStore.actionCreator, OptionStore.actionCreater),
)(MatrixStoryView)
