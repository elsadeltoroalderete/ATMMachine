const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
};
  
const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
    const handleChange = (event) => {
        const enteredAmount = Number(event.target.value);
    
        if (enteredAmount <= 0) {
            return setValidTransaction(false);
        }
    
        if (!isDeposit && enteredAmount > totalState) {
            setValidTransaction(false);
        } else {
            setValidTransaction(true);
        }
    
        setDeposit(enteredAmount);
    };
    
    const handleSubmit = (event) => {
        let amount = Number(deposit);
        if (!isDeposit) {
            amount = -amount; // If it's a withdrawal, make the amount negative
        }
    
        let newTotal = totalState + amount;
        setTotalState(newTotal);
        setValidTransaction(false);
        setDeposit(0); // Reset deposit to 0 after submission
        event.preventDefault();

        // Add the following line to clear the input field
        document.getElementById("number-input").value = "";
    };
    

    return (
        <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <button onClick={() => setIsDeposit(true)}>Deposit</button>
        <button onClick={() => setIsDeposit(false)}>Cash Back</button>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        </form>
    );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
