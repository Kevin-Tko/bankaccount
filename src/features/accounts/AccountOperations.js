import { useState } from "react";
import { Customer } from "../customers/Customer";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, requestLoan, payLoan } from "./accountSlice";

export function AccountOperations() {
    const [depositAmt, setDepositAmt] = useState("");
    const [withdrawalAmt, setWithdrawalAmt] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useDispatch();
    const { loan: currentLoan, loanPurpose: currentLoanPurpose } = useSelector(
        (store) => store.account
    );

    function handleDeposit(e) {
        e.preventDefault();
        if (!depositAmt) return;
        dispatch(deposit(depositAmt, currency));
        setDepositAmt("");
    }

    function handleWithdrawal(e) {
        e.preventDefault();
        if (!withdrawalAmt) return;
        dispatch(withdrawal(withdrawalAmt));
        setWithdrawalAmt("");
    }

    function handleLoanRequest(e) {
        e.preventDefault();
        if (!loanAmount || !loanPurpose) return;
        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount("");
        setLoanPurpose("");
    }

    function handleLoanPayment(e) {
        e.preventDefault();
        if (loanAmount < 0) return;
        dispatch(payLoan());
    }

    return (
        <>
            <Customer />
            <form>
                <div>
                    <label>Deposit:</label>
                    <input
                        type="number"
                        value={depositAmt}
                        onChange={(e) => setDepositAmt(+e.target.value)}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                    <button onClick={handleDeposit}>Deposit</button>
                </div>
                <div>
                    <label>Withdrawal:</label>
                    <input
                        type="text"
                        value={withdrawalAmt}
                        onChange={(e) => setWithdrawalAmt(+e.target.value)}
                    />
                    <button onClick={handleWithdrawal}>Withdrawal</button>
                </div>
                <div>
                    <label>Request Loan:</label>
                    <input
                        type="text"
                        placeholder="loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="loan purpose"
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                    />
                    <button onClick={handleLoanRequest}>Request Loan</button>
                </div>
                {currentLoan > 0 && (
                    <div>
                        <label>
                            Pay back ${" "}
                            <span>
                                {currentLoan} to {currentLoanPurpose}
                            </span>
                            :
                        </label>
                        <button onClick={handleLoanPayment}>Pay loan</button>
                    </div>
                )}
            </form>
        </>
    );
}
