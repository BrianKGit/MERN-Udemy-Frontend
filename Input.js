import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

// Function to manage multiple states. Receives a state and an action and returns a new state.
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // initial state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  // object destructuring to get id and onInput from props & value and isValid from inputState
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  /* 
  id, value, isValid, or onInput are my dependencies. Whenever onInput is called or id, value, or isValid change we will call onInput(id, value, isValid)
  */
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // function to handle validation when changes are made to the input field
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  // function to handle validation when the input field is selected or deselected
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // if the props.element is "input" use an input field otherwise use a textarea
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
