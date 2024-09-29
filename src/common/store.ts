import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import personReducer from "@features/person/slice";
import billReducer from "@features/bill/slice";

export const store = configureStore({
    reducer: {
        person: personReducer,
        bill: billReducer

    }
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