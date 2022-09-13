import React from "react";

class History extends React.Component {
  render() {
   const {history, deptAmount} = this.props; 
    return(
      <div className="history-wrapper">
      {history.map((payment) => (
        <div key={payment} className="history">
          <div className="history">
            Your Payment
            <div>{payment}</div>
          </div>
        </div>
      ))}
        <div className="history">
          The rest of the dept:
          <div>{deptAmount}</div>
        </div>
      </div>
    )
  }
}

export default History;