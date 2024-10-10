import { useSelector } from "react-redux";

export function Customer() {
    const customerName = useSelector((store) => store.customer.fullName);

    return (
        <>
            <h3>Welcome {customerName}</h3>
            <h6>Your account operations</h6>
        </>
    );
}
