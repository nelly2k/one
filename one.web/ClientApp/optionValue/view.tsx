import * as React from "react";
import { OptionValue } from "./model";


interface OptionValueViewProps{
    values:OptionValue[]
}

export class OptionValueView extends React.Component<OptionValueViewProps>{

    render(){
        return <div>{this.props.values.map(x=><div key={x.id}>{x.value}</div>)}</div>
    }
}