import * as React from "react";
import { Places } from "../common";

export const NotFoundErrorView = ()=><div>I'm an error page
    <div>Go <a href={Places.home.getUrl()}>Home</a></div>
</div>