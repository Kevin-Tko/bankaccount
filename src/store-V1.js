import { combineReducers, createStore } from "redux";

//////////////////////////// Initial states
const initialStateAccount = {
    balance: 0,
    loan: 0,
    isActive: false,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: "",
};

//////////////////////////// Reducer functions
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit": {
            return { ...state, balance: state.balance + action.payload };
        }
        case "account/withdrawal": {
            return { ...state, balance: state.balance - action.payload };
        }
        case "account/requestLoan": {
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        }
        case "account/repayLoan": {
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };
        }
        default: {
            return state;
        }
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createcustomer": {
            return {
                ...state,
                fullName: action.payload.fullname,
                nationalId: action.payload.nationaLID,
                createdAt: action.payload.createdAt,
            };
        }
        case "customer/updateName": {
            return {
                ...state,
                fullName: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

////////////////////////////combined reducers
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

//Action Creators
////////////////////////////Account actions
function deposit(amount) {
    return { type: "account/deposit", payload: amount };
}

function withdrawal(amount) {
    return { type: "account/withdrawal", payload: amount };
}

function requestLoan(amount) {
    return {
        type: "account/requestLoan",
        payload: { amount: amount, purpose: "buy a car" },
    };
}

function payLoan() {
    return { type: "account/repayLoan" };
}

//////////////////////////// customer actions
function createCustomer(fullname, nationaLID) {
    return {
        type: "customer/createcustomer",
        payload: { fullname, nationaLID, createdAt: new Date().toISOString() },
    };
}

function updateName(fullname) {
    return {
        type: "customer/updateName",
        payload: fullname,
    };
}

////////////////////////////Dispatching actions
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdrawal(200));
console.log(store.getState());

store.dispatch(requestLoan(1000));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("Kevin Njogu", "32439486"));
console.log(store.getState());

store.dispatch(updateName("Kevin Muriuki Njogu"));
console.log(store.getState());

// const store = createStore(reducer);
// console.log(store);

// store.dispatch({ type: "account/deposit", payload: 50 });
// console.log(store.getState());

// store.dispatch({
//     type: "account/requestLoan",
//     payload: { amount: 500, purpose: "buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/repayLoan" });
// console.log(store.getState());

// const storeAccount = createStore(accountReducer);

// const storeCustomer = createStore(customerReducer);
