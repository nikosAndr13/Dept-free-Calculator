import React from "react";
import Payment from "./Payment";
import Input from "./input";
import History from './history';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      deptAmount: '',
      interest:'',
      monthlyPayments: '',
      interestPaid: '',
      payment: '',
      borderColor: '',
      minPayment: '',
    }
  }

handleObj = ({target: {value, name}}) => {
this.setState((prevState) => ({
    ...prevState,
    [name]: value
  }))
}

handleSubmit = (e) => {
  e.preventDefault();
  const minPayment = Number(this.state.deptAmount * 0.01);
  const interestPaid = (((this.state.interest / 100)  / 12) * this.state.deptAmount).toFixed(2);

  this.setState({
    monthlyPayments: minPayment,
    interestPaid: interestPaid,
    minPayment: (Number(minPayment) + Number(interestPaid)),
  })
}

boxClick = (e) => {
  e.preventDefault();
  if (Number(this.state.payment) >= Number(this.state.minPayment)) {
    this.successfulPayment();
  } 
}

successfulPayment = () => {
  
  this.setState(( prevState ) => {
    const deptAmount = (this.state.deptAmount - (this.state.payment - this.state.interestPaid));
    const interestPaid = ((this.state.interest / 100)  / 12) * deptAmount;
    const minPayment = Number((Number(deptAmount) * 0.01) + Number(interestPaid)).toFixed(2);
    const newPayment = {
      payment: this.state.payment,
      deptAmount: deptAmount,
      interestPaid: this.state.interestPaid,
    }
    return {
      deptAmount: deptAmount,
      history: [...prevState.history, newPayment],
      minPayment: minPayment,
      interestPaid: interestPaid,
  }})
  this.handleFinalPay();
} 

handleFinalPay = () => {
  if (this.state.deptAmount <= 100) {
    this.setState({
      minPayment: Number(this.state.deptAmount + (this.state.deptAmount * 0.01)).toFixed(2),
      deptAmount: 0, 
    })
  }
}


  render() {
    const inputs = [
      {id:'1',title: 'Loan Amount', name: 'deptAmount', label: '$', wrapper:false},
      {id:'2',title: 'Interest rate per year', label:'$', name:'interest', wrapper:true},
    ]
    return ( 
      <div className="calculator-layout">
      <div className="App">
      <form className="calc-form">
      <div className="form-layout">
        {inputs.map((item) => {
          const {id, title, name, label, wrapper} = item;
          return (
            <div key={id}>
            <div>{title}</div>
              <div className={wrapper ? 'calc-wrapper' : ''}>
               <Input
                handleObj={this.handleObj}
                name={name}
                label={label && label}
               />
              {wrapper ?(<button onClick={this.handleSubmit}>CALCULATE</button>) : ''}
              </div>
            </div>
          ) 
        })}
        </div>
      </form>

      <div className="result-section">
        Monthly Payments 

        <div id="interest">{Number(this.state.minPayment).toFixed(2)}$</div>
        <div className="paid-principals">
          <div>
            <label className="principal-etiquette">Total Principal Paid</label>
            <div>
              {Number(this.state.deptAmount).toFixed(2)}</div>
          </div>
          <hr/>
          <div>
            <label className="interest-etiquette">Total Interest Paid</label>
            <div>{Number(this.state.interestPaid).toFixed(2)}</div>
          </div>
        </div>
        <div className="input-container compare-wrapper">
        <button className="compare-rates" onClick={this.boxClick}>MAKE A PAYMENT</button>
        </div>
        <a href="#">Show Payment History</a>
      </div>
      </div>
        <History 
          history={this.state.history}
        />
        <Payment 
          deptAmount={Number(this.state.deptAmount).toFixed(2)}
          trackState={this.handleObj}
          boxClick={this.boxClick}
          interestPaid={Number(this.state.interestPaid).toFixed(2)}
          invalidPayment={Number(this.state.minPayment) > Number(this.state.payment)}
          minPayment={this.state.minPayment}
      />
      </div>
    )
  }
}



export {Calculator};