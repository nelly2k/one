export interface IOnePlace{
    isExact?:boolean;
    path:string;
    
    title:string;
    getUrl():string;
    
    withTitle(title:string):IOnePlace;
    withParams(...params:any[]):IOnePlace;
}

export class BasePlace implements IOnePlace {

    constructor(title:string, path:string,isExact?:boolean){
        this.mainTitle = title;
        this.path = path;
        this.isExact = isExact;
    }
    readonly mainTitle: string;
    secondaryTitle?:string;
    isExact?: boolean | undefined;
    path: string;
    component: any;
    params?: any[] | undefined;
    get title(){
        return this.secondaryTitle || this.mainTitle;
    }
   
    getUrl(): string {
        const params = this.path.match(/\/:(\w)*(|$)/g);
        if (!params ||  !this.params){
            return this.path;
        }
        var result = this.path;
        var counter = 0;
        for(let par in params){
            var parToReplace = params[par].replace(new RegExp("/","g"),"");
            result = result.replace(parToReplace, this.params[counter]);
            counter++;
        }
      
        return result;
    }
    withTitle(title: string): IOnePlace {
        this.secondaryTitle = title;
        return this;
    }
    withParams(...params: any[]): IOnePlace {
        this.params = params;
        return this;
    }
}
export class Places{
    static home:IOnePlace = new BasePlace("Home", "/");
    static story:IOnePlace = new BasePlace("Story", "/story/:id");
    static newStory:IOnePlace= new BasePlace("New story", "/new");
    static newFeature:IOnePlace= new BasePlace("New feature", "/story/:storyId/new-feature");
    static newOption:IOnePlace = new BasePlace("New option", "/story/:storyId/new-option");
    static valueView:IOnePlace = new BasePlace("Value", "/story/:storyId/:featureId/:optionId");
    static notFoundError:IOnePlace = new BasePlace("Page isn't found", "/not-found");
}

