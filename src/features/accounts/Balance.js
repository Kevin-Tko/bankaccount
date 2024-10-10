import { useSelector } from "react-redux";

export function Balance() {
    const accountBalance = useSelector((store) => store.account.balance);

    function formatBalance(value) {
        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
        }).format(value);
    }

    return (
        <div className="balance">
            <p>
                <span>
                    {!accountBalance ? 0 : formatBalance(accountBalance)}
                </span>
            </p>
        </div>
    );
}
