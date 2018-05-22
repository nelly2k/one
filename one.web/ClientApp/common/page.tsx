import * as React from "react";
import { NavLink } from "react-router-dom";
import { IOnePlace } from ".";

interface PageProps{
    className?:string;
    places?:IOnePlace[]
}

export class Page extends React.Component<PageProps> {

    getAllExceptLast( places:IOnePlace[]) :IOnePlace[]{
        if (places.length<=1){
            return places;
        }

        return places.slice(0,-1);
    }

    getLast(places:IOnePlace[]):IOnePlace{

        return places[places.length-1];
    }

    render() {
        return <div className={`grid-container fluid ${this.props.className}`}>
            {this.props.places && <nav aria-label="You are here:" role="navigation">
                <ul className="breadcrumbs">
                    {
                        this.getAllExceptLast(this.props.places).map(place=>  <li key={place.title}>  <NavLink exact to={place.getUrl()} activeClassName='show-for-sr'>{place.title}</NavLink></li>)
                    }

                    {
                        this.props.places && <li>                     
                        {this.getLast(this.props.places).title}                      </li>
                    }
                </ul>
            </nav>}
            { this.props.children }
        </div>
    }
}