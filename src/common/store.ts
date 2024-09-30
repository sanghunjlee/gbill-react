import { combineReducers, configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import personReducer from "@features/person/slice";
import billReducer from "@features/bill/slice";

const storageKey = "gbillState";

const reHydrateStore = () => {
    const loaded = localStorage.getItem(storageKey);
    if (loaded !== null) {
        return JSON.parse(loaded);
    }
}

export const store = configureStore({
    reducer: combineReducers({
        person: personReducer,
        bill: billReducer
    }),
    preloadedState: reHydrateStore()
});

store.subscribe(() => {
    localStorage.setItem(storageKey, JSON.stringify(store.getState()));
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;