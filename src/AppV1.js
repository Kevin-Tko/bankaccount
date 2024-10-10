import { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "openAccount": {
            return {
                ...state,
                balance: state.balance + action.payload,
                isActive: true,
            };
        }

        case "deposit": {
            return { ...state, balance: state.balance + action.payload };
        }

        case "withdraw": {
            return { ...state, balance: state.balance - action.payload };
        }

        case "applyLoan": {
            if (state.loan) return { ...state };
            return { ...state, loan: state.loan + action.payload };
        }

        case "payLoan": {
            if (state.loan <= 0) return;
            return { ...state, loan: state.loan - action.payload };
        }

        case "closeAccount": {
            // if (state.balance && state.loan !== 0) return { ...state };
            const balances = state.balance !== 0 || state.loan !== 0;
            console.log(balances);
            return {
                ...state,
                isActive: balances ? state.isActive : !state.isActive,
            };
        }

        default: {
            throw new Error("Action not found");
        }
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { balance, loan, isActive } = state;

    return (
        <Container
            dispatch={dispatch}
            balance={balance}
            active={isActive}
            loan={loan}
        />
    );
}

function Container({ dispatch, balance, active, loan }) {
    return (
        <>
            <h2>Balance: {balance}</h2>
            <h2>Loan: {loan}</h2>
            <div>
                <button
                    className="btn"
                    onClick={() =>
                        dispatch({ type: "openAccount", payload: 500 })
                    }
                    disabled={active}
                >
                    Open account
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "deposit", payload: 150 })}
                    disabled={!active}
                >
                    Deposit 150
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "withdraw", payload: 50 })}
                    disabled={!active}
                >
                    Withdrawal 50
                </button>
                <button
                    className="btn"
                    onClick={() =>
                        dispatch({ type: "applyLoan", payload: 5000 })
                    }
                    disabled={!active}
                >
                    Request a loan of 5000
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
                    disabled={!active}
                >
                    Pay loan
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "closeAccount" })}
                    disabled={!active}
                >
                    Close account
                </button>
            </div>
        </>
    );
}
