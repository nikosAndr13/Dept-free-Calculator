import React from "react";

class Payment extends React.Component {
  render() { 
    const {deptAmount, trackState,boxClick, interestPaid, invalidPayment, minPayment} = this.props;
     return (
    <div className="payment-base payment-click">
      <form>
        <div>Your Loan Amount: {deptAmount}</div>
        <div className={`input-container ${invalidPayment ? 'shake' : ''}` }>
          <input onChange={trackState} type='text' name='payment' autoComplete="off"/>
        </div>
        <small>Your Payment should be more than 1% <strong>{minPayment}$</strong></small> 
        <br/>
        <br/>
        <div>The Interest to be paid: {interestPaid}</div>
        <div className="calc-wrapper">
          <button onClick={boxClick}>Confirm Payment</button>      
      </div>
      </form>
    </div>
    )
  }
}

export default Payment;