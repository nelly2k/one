import { Feature } from "../../feature/list/model";
import { Option } from "../../option/model";
import { OptionValue } from "../../optionValue/model";

export interface StoryDetails {
    id : string;
    title : string;
}

export interface StoryFull extends StoryDetails{
    features:Feature[];
    options:Option[];
    optionValues:OptionValue[];

}