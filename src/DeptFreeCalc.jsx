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
  const minPayment = Number(((this.state.deptAmount * 0.01).toFixed(2))) + Number(this.state.interestPaid);
  const interestPaid = (((this.state.interest / 100)  / 12) * this.state.deptAmount).toFixed(2);
  const timeToFree = Number(this.state.monthsToDeptFree) + Number((this.state.yearsToDeptFree * 12));
  const normalPayment = ((this.state.deptAmount / timeToFree)).toFixed(2);
  const monthlyPayment = (Number(interestPaid) + Number(normalPayment)).toFixed(2)

  this.setState({
    monthlyPayments: monthlyPayment,
    interestPaid: interestPaid,
    minPayment: minPayment,
  })
}

boxClick = (e) => {
  e.preventDefault();
  if (this.state.payment > this.state.minPayment) {
    this.successfulPayment();
  }
}

successfulPayment = () => {
  this.setState(( prevState ) => {
    const deptAmount = (this.state.deptAmount - (this.state.payment - this.state.interestPaid));
    return {
      deptAmount: deptAmount,
      history: [...prevState.history, this.state.payment],
      minPayment: deptAmount * 0.01,
      interestPaid: ((this.state.interest / 100)  / 12) * deptAmount,
    
  }})
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
    const inputs = [
      {id:'1',title: 'Loan Amount', name: 'deptAmount', label: '$', wrapper:false},
      {id:'2',title: 'Loan Term in months', name:'yearsToDeptFree', wrapper: false},
      {id:'3',title: 'Loan Term in years', name:'monthsToDeptFree', wrapper:false},
      {id:'4',title: 'Interest rate per year', label:'$', name:'interest', wrapper:true},
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
        <button className="compare-rates" onClick={this.boxClick}>MAKE A PAYMENT</button>
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
          invalidPayment={Number(this.state.minPayment) + Number(this.state.interestPaid) > this.state.payment}
          minPayment={this.state.minPayment}
      />
      </div>
    )
  }
}



export {Calculator};