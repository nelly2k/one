import { SearchRequest } from ".";
import {Story} from "./model";

export interface RequestSearchAction {
    type : "SEARCH",
    searchRequest : SearchRequest;
}
export interface ReceiveSearchAction {
    type : "SEARCH_SUCCESS",
    searchRequest : SearchRequest;
    stories : Story[];
}