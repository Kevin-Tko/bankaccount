import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
        },
        withdrawal(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                    },
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + state.loan;
            },
        },
        payLoan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
    },
});

///check output of below on the console
console.log(accountSlice);

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (!currency === "USD")
        return { type: "account/deposit", payload: amount };

    //thunk
    return async function (dispatch, getState) {
        try {
            const response = await fetch(
                `https://api.frankfurter.app/latest?base=USD`
            );
            const data = await response.json();
            const converted = amount / data.rates[currency];

            dispatch({ type: "account/deposit", payload: converted });
        } catch (err) {
            console.log(err.message);
        }
    };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit": {
//             return { ...state, balance: state.balance + action.payload };
//         }
//         case "account/withdrawal": {
//             return { ...state, balance: state.balance - action.payload };
//         }
//         case "account/requestLoan": {
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };
//         }
//         case "account/repayLoan": {
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan,
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }

// export function deposit(amount, currency) {
//     if (!currency === "USD")
//         return { type: "account/deposit", payload: amount };

//     //thunk
//     return async function (dispatch, getState) {
//         try {
//             const response = await fetch(
//                 `https://api.frankfurter.app/latest?base=USD`
//             );
//             const data = await response.json();
//             const converted = amount * data.rates[currency];

//             dispatch({ type: "account/deposit", payload: converted });
//         } catch (err) {
//             console.log(err.message);
//         }
//     };
// }

// export function withdrawal(amount) {
//     return { type: "account/withdrawal", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount: amount, purpose: purpose },
//     };
// }

// export function payLoan() {
//     return { type: "account/repayLoan" };
// }
