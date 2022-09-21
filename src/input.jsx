import React from "react";

const Input = ({handleObj, name, label}) => {
    return (
      <div className="input-container">
        <input onChange={handleObj} name={name} type="text" autoComplete="off" />
        <label>{label}</label>
      </div>
    )
  
}

export default Input;