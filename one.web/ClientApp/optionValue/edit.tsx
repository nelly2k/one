import * as React from "react";
import * as OptionValueStore from "./store";
import * as StoryStore from "../story/storyStore";
import { RouteComponentProps } from "react-router-dom";
import { OptionValueType, OptionValue, NewOptionValue } from "./model";
import { Editable } from "../common";
import { Option } from "../option/model";
import { ApplicationState } from "../common/store";
import { connect } from "react-redux";

type OptionValueViewProps =
    OptionValueStore.IOptionValueState
    & typeof OptionValueStore.actionCreator
    & typeof StoryStore.actionCreators
    & RouteComponentProps<{ storyId: string, featureId: number, optionId: number }>


class OptionValueEdit extends React.Component<OptionValueViewProps>{
    storyId:string | undefined;
    featureId:number | undefined;
    optionId:number | undefined;

    componentDidMount() {
        this.storyId = this.props.match.params.storyId;
        this.featureId = this.props.match.params.featureId;
        this.optionId = this.props.match.params.optionId;
        this.props.fetchStory(this.storyId);
    }

    getEditor = (optionValue: OptionValue) => {
        switch (optionValue.optionValueType) {
            case OptionValueType.Notes:
                return <Editable key={optionValue.id} value={optionValue.value} onCommit={x=>this.saveValue(optionValue.id, x, OptionValueType.Notes)} />
            default:
                return null;
        }
    }
    getValues(): OptionValue[] {
        var values  = this.props.values.sort(x=>x.order).filter(x => x.featureId == this.featureId && x.optionId == this.optionId);
        if (values.filter(x=>x.optionValueType == OptionValueType.Notes).length == 0){
            values.splice(0,0,{optionValueType:OptionValueType.Notes,id:0} as OptionValue);
        }
        return values;
    }

    saveValue=(id:number, value:string|undefined, valueType: OptionValueType | undefined): void=>{
        if (!this.storyId || !this.featureId|| !this.optionId){
            return;
        }
        if (id==0){
            this.props.addOptionValue(this.storyId, 
                this.featureId, 
                this.optionId,{optionValueType:valueType, value:value} as NewOptionValue)
        }else{
            this.props.updateValue(this.storyId, this.featureId, this.optionId,id, value || "");
        }
        
    }

    render() {
        return <div>
            <div className="grid-x">
                <div className="cell medium-2">
                    Rating
                </div> 
            </div>
            <div>
                {this.getValues().map(this.getEditor)}
            </div>
           
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.optionValue,
    Object.assign(StoryStore.actionCreators,OptionValueStore.actionCreator)
)(OptionValueEdit)