import * as React from "react";

interface ValueEditProps{
    value:string;
    onEdit:(value:string)=>void
}

export class RatingEdit extends React.Component<ValueEditProps>{

    render(){
        return <div>
            <span></span>
        </div>
    }
}