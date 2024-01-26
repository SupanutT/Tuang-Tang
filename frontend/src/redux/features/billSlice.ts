import { createSlice } from "@reduxjs/toolkit";
import { Bill } from "../../../interfaces";
import getBills from "@/libs/getBills";

type BillState = {
    bill: Bill[]
}

const billResponse = getBills();
// console.log(billResponse)
const bill: Bill[] = billResponse;

const initialState:BillState = { bill: bill }
