import { useSelector } from "react-redux";
import { AccountOperations } from "./features/accounts/AccountOperations";
import { CreateCustomer } from "./features/customers/CreateCustomer";
import { Balance } from "./features/accounts/Balance";

export default function App() {
    const fullname = useSelector((store) => store.customer.fullName);

    return (
        <div className="container">
            <h1>The React-Redux App</h1>
            {fullname === "" ? (
                <CreateCustomer />
            ) : (
                <>
                    <Balance />
                    <AccountOperations />
                </>
            )}
        </div>
    );
}
