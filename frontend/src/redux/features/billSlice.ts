import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Bill } from "../../../interfaces";


type BillState = {
    bill: Bill | null
};

const initialState:BillState = { bill: null }

const BillSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        setBill: (state, action: PayloadAction<Bill> ) => {
            state.bill = action.payload;
        },
        clearBill: (state) => {
            state.bill = null;
        }
    }
})

export const { setBill, clearBill } = BillSlice.actions;
export default BillSlice.reducer;
