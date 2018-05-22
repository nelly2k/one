import * as StoryStore from "../story/storyStore"
import * as SearchStore from "../story/searchStore"
import * as FeatureStore from "../feature/store"
import * as OptionStore from "../option/optionStore"
import * as OptionValueStore from "../optionValue/store"

// The top-level state object
export interface ApplicationState {
    story:StoryStore.State;
    search:SearchStore.State;
    feature:FeatureStore.FeatureState;
    option:OptionStore.OptionState;
    optionValue:OptionValueStore.IOptionValueState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    story:StoryStore.reducer,
    search:SearchStore.reducer,
    feature:FeatureStore.reducer,
    option:OptionStore.reducer,
    optionValue:OptionValueStore.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
