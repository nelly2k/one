import * as StoryStore from "../storyStore";
import * as FeatureStore from "../../feature/store";
import * as OptionStore from "../../option/optionStore";
import { RouteComponentProps } from "react-router";
import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../common/store";
import { Page } from "../../common/page";
import { Places, Editable } from "../../common";
import { StoryDetails } from "./model";
import { Link } from "react-router-dom";
import { Option, NewOption } from "../../option/model";
import { ITitled } from "ClientApp/common/title";
import { NewFeature } from "../../feature/add/model";

type StoryDetailProps =
    ApplicationState
    & typeof StoryStore.actionCreators
    & typeof FeatureStore.actionCreator
    & typeof OptionStore.actionCreater
    & RouteComponentProps<{ id: string }>;

interface IMatrixViewState {
    isOptionsOnTop: boolean;
    page: number;
    isAddLeft:boolean;
    isAddTop:boolean;
}

class StoryView extends React.Component<StoryDetailProps, IMatrixViewState>{

    onPage: number = 3;
    state: IMatrixViewState = {
        isOptionsOnTop: true,
        page: 1,
        isAddLeft:false,
        isAddTop:false,
    }
    componentWillMount():void {
        this.props.fetchStory(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps: StoryDetailProps) {
        if (this.props.match.params.id != nextProps.match.params.id) {
            this.props.fetchStory(nextProps.match.params.id);
        }

        if (nextProps.story.isNotFound){
            this.props.history.push(Places.notFoundError.getUrl());
        }
    }

    getTitle(details: StoryDetails | undefined): string {
        if (!details) {
            return "";
        } else {
            return details.title;
        }
    }

    getPaged = (items: ITitled[], page: number): ITitled[] => {
        var from = (page - 1) * this.onPage;
        return items.slice(from, from + this.onPage)
    }

    getHorizontall = (isOptionsOnTop: boolean): ITitled[] => {
        return (isOptionsOnTop ? this.props.option.options : this.props.feature.features);
    }

    getVericall = (isOptionsOnTop: boolean): ITitled[] => {
        return (isOptionsOnTop ? this.props.feature.features : this.props.option.options);
    }

    toggle = () => {
        this.setState({ isOptionsOnTop: !this.state.isOptionsOnTop, page: 1 });
    }

    canNext = (): boolean => {
        const maxPages = this.getHorizontall(this.state.isOptionsOnTop).length / this.onPage;
        return this.state.page < maxPages;
    }

    next = () => {
        const maxPages = this.getHorizontall(this.state.isOptionsOnTop).length / this.onPage;
        if (this.state.page >= maxPages) {
            return;
        }
        this.setState({ page: this.state.page + 1 })
    }

    canPrev = () => {
        return this.state.page > 1;
    }
    prev = () => {
        if (this.state.page <= 1) {
            return;
        }

        this.setState({ page: this.state.page - 1 })
    }

    updateFeatureOption = (item: ITitled, newValue: string| undefined, isOnTop: boolean): void => {
        if (newValue == undefined){
            return
        }
        if (isOnTop != this.state.isOptionsOnTop) {
            this.props.updateFeature(this.props.match.params.id, item.id, "title", newValue);
        }else{
            this.props.updateOption(this.props.match.params.id, item.id, newValue);
        }
    }


    getvValuesFromHV = (top:number, left:number)=>{
        const featureId = this.state.isOptionsOnTop?left:top;
        const optionId = this.state.isOptionsOnTop?top:left;
        return this.getValues(featureId,optionId);
    }

    getValues=(featureId:number, optionId:number)=>{
        const values = this.props.optionValue.values.filter(x=>x.featureId == featureId && x.optionId == optionId);
        const valueUrl = Places.valueView.withParams(this.props.match.params.id, featureId, optionId).getUrl();
        
        return <div key={`val-${featureId}-${optionId}`} className="cell medium-3"><a className="value" href={valueUrl}>
            {values.map(x=><div key={`${x.id}-${x.featureId}-${x.optionId}`}>{x.value}</div>)}</a>
        </div>
    }


    addLeft=()=>{
        this.setState({isAddLeft:true});
    }

    addTop=()=>{
        this.setState({isAddTop:true});
    }
    topAdded = (title:string)=>{
        if (!this.props.story.story){
            return;
        }
        if (this.state.isOptionsOnTop){
            this.addOption(title);
        }else{
            this.addFeature(title);
        }
        this.setState({isAddTop:false});
    }

    leftAdded=(title:string)=>{
       
        if (this.state.isOptionsOnTop){
            this.addFeature(title);
        }else{
            this.addOption(title);
        }
        this.setState({isAddLeft:false});
    }

    addFeature(title:string){
        if (!this.props.story.story){
            return;
        }
        const feature = {
            title:title} as NewFeature;

        this.props.addNewFeature(this.props.story.story.id,
            feature);
       
    }

    addOption(title:string){
        if (!this.props.story.story){
            return;
        }
        const option = {
            title:title} as NewOption;

        this.props.addOption(this.props.story.story.id,
            option);
       
    }

    render() {
        let horizontal = this.getPaged(this.getHorizontall(this.state.isOptionsOnTop),this.state.page);
        let { feature, option } = this.props;

        return <Page className="matrix" places={[Places.home, Places.story.withTitle(this.getTitle(this.props.story.story))]} >
            <span>Page: {this.state.page}</span><br/>
            <span>Is option on top: {this.state.isOptionsOnTop}</span><br/>
            <button onClick={this.addLeft}>Add Left</button>
            <button onClick={this.addTop}>Add Top</button>
            <button onClick={this.toggle}>Toggle</button>
            <button disabled={!this.canPrev()} onClick={this.prev}>Prev</button>
            <button disabled={!this.canNext()} onClick={this.next}>Next</button>
            {this.props.story.story &&
                <div>           <h2>{this.props.story.story.title}</h2>
                    <div className="grid-x">
                        <div className="cell medium-3">One cell</div>
                  
                        {horizontal.map(x => <div key={`top${x.id}`} className="cell medium-3">
                                <Editable isRequired={true} value={x.title} 
                                    onCommit={val => this.updateFeatureOption(x, val, true)} />
                            </div>)}
                            {this.state.isAddTop &&<div className="cell medium-3"> 
                            <Editable isRequired={true} isEdit={true} onCommit={x=>this.topAdded(x!)}  />
                        </div>}
                    </div>
                    
                        {this.getVericall(this.state.isOptionsOnTop).map(v => 
                        <div key={`left${v.id}`}  className="grid-x">
                            <div className="cell medium-3">
                                <Editable isRequired={true} value={v.title} 
                                    onCommit={val => this.updateFeatureOption(v, val, false)} />
                            </div>
                              {horizontal.map(h=>this.getvValuesFromHV(v.id, h.id))}
                        </div>)}
                    <div className="grid-x">
                    {this.state.isAddLeft &&<div className="cell medium-3"> 
                        <Editable isRequired={true} isEdit={true} onCommit={x=>this.leftAdded(x!)}  />
                    </div>}
                    </div>
                </div>
            }
        </Page>
    }
}

export default connect(
    (state: ApplicationState) => state,
    Object.assign(StoryStore.actionCreators, FeatureStore.actionCreator, OptionStore.actionCreater),
)(StoryView)
