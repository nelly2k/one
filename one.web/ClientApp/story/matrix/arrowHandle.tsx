import * as React from "react";

interface IArrowHandleProps{
    isLeft:boolean;
    value?:number;
    onClick?:()=>void;
}

export class ArrowHandle extends React.Component<IArrowHandleProps>{
    render():JSX.Element{
        return <div onClick={()=>this.props.onClick?this.props.onClick():null} 
            className={`arrow ${this.props.isLeft?"left":"right"}`}>
        {this.props.value&& <span>{this.props.value>99?<i>&#x221e;</i>:this.props.value}</span>}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 309.143 309.143"><path d="M112.855 154.571L240.481 26.946a7.5 7.5 0 0 0 0-10.606L226.339 2.197a7.497 7.497 0 0 0-10.606 0L68.661 149.268a7.5 7.5 0 0 0 0 10.606l147.071 147.071a7.497 7.497 0 0 0 10.606 0l14.142-14.143a7.5 7.5 0 0 0 0-10.606L112.855 154.571z" fill="#231f20"/></svg>
        </div>
    }
}