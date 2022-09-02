import React from "react";

class History extends React.Component {



  render() {
   const {history, deptAmount} = this.props; 
    return(
      <div class="history-wrapper">
      {history.map(payment => 
      <div className="history">
        <div className="history">
          Your Payment
          <div key={payment}>{payment}</div>
        </div>
      </div>
      )}
        <div className="history">
          The rest of the dept:
      <div key={deptAmount}>{deptAmount}</div>
      </div>
      </div>
    )
  }
}

export default History;