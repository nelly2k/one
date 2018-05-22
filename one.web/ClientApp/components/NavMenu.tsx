import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav aria-label="You are here:" role="navigation">
            <ul className="breadcrumbs">
                <li>  <NavLink exact to={'/'} activeClassName='show-for-sr'>Home</NavLink></li>
            </ul>
        </nav>
    }
}
