import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IOnePlace, Places } from './common';
import StorySearch from "./story/list";
import Story from "./story/view";
import NewStory from "./story/add";
import NewFeature from "./feature/add";
import NewOption from "./option/add/view";
import OptionValueEdit from "./optionValue/edit";
import { NotFoundErrorView } from './error/notFound';

export const routes = <Layout>
    {getRoute(Places.home, StorySearch)}
    {getRoute(Places.story, Story)}
    {getRoute(Places.newStory, NewStory)}
    {getRoute(Places.newFeature, NewFeature)}
    {getRoute(Places.newOption, NewOption)}
    {getRoute(Places.valueView, OptionValueEdit)}
    {getRoute(Places.notFoundError, NotFoundErrorView)}
   
</Layout>;

function getPlaces():IOnePlace[]{
        var result:IOnePlace[]=[];
        for(let place in Places){
            result.push((Places as any)[place])
        }
        
        return result;
     }

function getRoute(place: IOnePlace, component:any){
    return  <Route key={place.title} path={place.path}
    exact component={component} ></Route>
}