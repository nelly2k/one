import * as React from "react";

interface IButtonProps{
    onClick:()=>void;
    disabled?:boolean|undefined;
    children:any;
}

export const IconButton = (props:IButtonProps)=><BaseButton {...props} className="icon">{props.children}</BaseButton>

interface IBaseButtonProps extends IButtonProps{
    className:string;
}

const BaseButton = (props:IBaseButtonProps)=><button 
    {...props}
    className={`button ${props.className}`}>{props.children}</button>