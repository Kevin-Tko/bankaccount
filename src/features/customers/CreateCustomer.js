import { useState } from "react";
import { createCustomer } from "./customerSlice";
import { useDispatch } from "react-redux";
import store from "../../store";

export function CreateCustomer() {
    const [customerName, setCustomerName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        if (!customerName || !nationalId) return;
        dispatch(createCustomer(customerName, nationalId));
        console.log(store.getState());
        setCustomerName("");
        setNationalId("");
    }

    return (
        <>
            <div className="header">
                <h6>Create new customer</h6>
            </div>
            <form>
                <div>
                    <label>Cutomer full name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID:</label>
                    <input
                        type="text"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create customer</button>
            </form>
        </>
    );
}
