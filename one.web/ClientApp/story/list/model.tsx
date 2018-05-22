export interface Story{
    id:string;
    title:string;
    featuresNumber:number;
    optionsNumber:number;
}

export interface SearchRequest{
    term:string;
    page:number;
}

export interface SearchResponse{
    page:number;
    pages:number;
    total:number;
    stories:Story[]
}