import React from "react";

class Input extends React.Component {

  render() {
    const {handleObj, name, label} = this.props;
    return (
      <div className="input-container">
        <input onChange={handleObj} name={name} type="text" autoComplete="off"/>
        <label>{label}</label>
      </div>
    )
  }
}

export default Input;