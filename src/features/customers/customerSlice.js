import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(
                fullName,
                nationalId,
                createdAt = new Date().toISOString()
            ) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createdAt,
                    },
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            },
        },
        updateCustomer(state, action) {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;

export default customerSlice.reducer;
// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createcustomer": {
//             return {
//                 ...state,
//                 fullName: action.payload.fullname,
//                 nationalId: action.payload.nationaLID,
//                 createdAt: action.payload.createdAt,
//             };
//         }
//         case "customer/updateName": {
//             return {
//                 ...state,
//                 fullName: action.payload,
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }

// export function createCustomer(fullname, nationaLID) {
//     return {
//         type: "customer/createcustomer",
//         payload: { fullname, nationaLID, createdAt: new Date().toISOString() },
//     };
// }

// export function updateName(fullname) {
//     return {
//         type: "customer/updateName",
//         payload: fullname,
//     };
// }
