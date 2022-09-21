import React from "react";

class History extends React.Component {
  render() {
    const {history} = this.props; 
    return(
      <div className="history-wrapper">
      {history.map((payment) => (
        <div key={payment} className="history">
          <div className="history">
             Your Payment
            <div>{Number(payment.payment).toFixed(2)}</div>
          </div>
          <div className="history">
          The rest of the dept:
            <div>{Number(payment.deptAmount).toFixed(2)}</div>
          </div>
          <div className="history">
            Interest paid:
            <div>{Number(payment.interestPaid).toFixed(2)}</div>
          </div>
        </div>
      ))}
      </div>
    )
  }
}

export default History;