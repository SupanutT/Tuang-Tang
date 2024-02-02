import { configureStore } from "@reduxjs/toolkit";
import BillSlice from "./features/billSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        BillSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
