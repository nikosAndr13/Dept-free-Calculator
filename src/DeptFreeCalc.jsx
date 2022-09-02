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
    yearsToDeptFree: '',
    monthsToDeptFree: '',
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
  const interestAmount = (((this.state.interest / 100)  / 12) * this.state.deptAmount).toFixed(2);
  const timeToFree = Number(this.state.monthsToDeptFree) + Number((this.state.yearsToDeptFree * 12))
  
  const normalPayment = ((this.state.deptAmount / timeToFree)).toFixed(2)
  console.log(normalPayment)
  
  const monthlyPayment = (Number(interestAmount) + Number(normalPayment)).toFixed(2)
  
  
  this.setState({
    monthlyPayments: monthlyPayment,
    interestPaid: interestAmount,
  })
}

boxClick = (e) => {
  e.preventDefault();
 const minPayment = Number(((this.state.deptAmount * 0.01).toFixed(2)))
  this.setState ({
    minPayment: minPayment
  })
  if (this.state.payment > minPayment) {
    this.successfulPayment();
  }
}

successfulPayment = () => {
  this.setState ({
    deptAmount: Number((this.state.deptAmount - (this.state.payment - this.state.interestPaid))).toFixed(2),
  })

  this.setState(prevState => ({
    history: [...prevState.history, this.state.payment],
  }))
  this.handleFinalPay();
} 

handleFinalPay = () => {
  if (this.state.deptAmount <= 100) {
    this.setState({
      minPayment: Number(this.state.deptAmount + (this.state.deptAmount * 0.01)).toFixed(2),
      deptAmount: 'Dept Free 💵', 
    })
  }
}


  render() {
    return( 
      <div className="calculator-layout">
      <div className="App">
      <form className="calc-form">
      <div className="form-layout">
       <div>Loan Amount</div>
        <Input 
        handleObj={this.handleObj}
        name={'deptAmount'}
        label={'$'}
        />

      <div>Loan Term in years</div>
      <Input
      handleObj={this.handleObj}
      name={'yearsToDeptFree'}
      />

      <div>Loan Term in months</div>
      <Input 
      handleObj={this.handleObj}
      name={'monthsToDeptFree'}
      />

      <div>Interest rate per Year</div>
      <div className="calc-wrapper">
        <Input 
        handleObj={this.handleObj} 
        name={'interest'} 
        label={'%'}/>
       <button onClick={this.handleSubmit}>CALCULATE</button> 
      </div>
      </div>
      </form>

      <div className="result-section">
        Monthly Payments 

        <div id="interest">{this.state.monthlyPayments}$</div>
        <div className="paid-principals">
          <div>
            <label className="principal-etiquette">Total Principal Paid</label>
            <div>
              {this.state.deptAmount}</div>
          </div>
          <hr/>
          <div>
            <label className="interest-etiquette">Total Interest Paid</label>
            <div>{this.state.interestPaid}</div>
          </div>
        </div>
        <div className="input-container compare-wrapper">
        <button className="compare-rates" onClick={this.proceedToPay}>MAKE A PAYMENT</button>
        </div>
        <a href="#">Show Payment History</a>
      </div>
      </div>
        <History 
        history={this.state.history}
        deptAmount={this.state.deptAmount}
        />
        <Payment 
       deptAmount={this.state.deptAmount}
       trackState={this.handleObj}
       boxClick={this.boxClick}
       interestPaid={this.state.interestPaid}
       invalidPayment={this.state.payment < this.state.minPayment}
       minPayment={this.state.minPayment}
      />
      </div>
    )
  }
}



export {Calculator};