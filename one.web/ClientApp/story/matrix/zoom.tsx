import * as React from "react";
import { IconButton } from "../../common/button";

interface IZoomProps{
    onPlus:()=>void;
    onMinus:()=>void;
    min:number;
    max:number;
    value?:number;
}

interface IZoomState{
    curr:number;
}

export class Zoom extends React.Component<IZoomProps, IZoomState>{

    componentWillMount():void{
        this.setState({curr:this.props.value || this.props.min})
    }

    canPlus():boolean{
        return this.state.curr < this.props.max;
    }

    canMinus():boolean{
        return this.state.curr > this.props.min;
    }

    onMinus = ()=>{
        this.setState({curr: this.state.curr-1});
        this.props.onMinus();
    }

    onPlus = ()=>{
        this.setState({curr: this.state.curr+1});
        this.props.onPlus();
    }

    render(){
        return <div><IconButton key="minus" 
                    disabled={this.canMinus()}
                    onClick={this.onMinus}>-</IconButton>
                <IconButton key="plus" 
                    disabled={!this.canPlus()}
                    onClick={this.onPlus}>+</IconButton></div>
    }
}