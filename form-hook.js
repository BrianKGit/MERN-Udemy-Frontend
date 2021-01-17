import { useCallback, useReducer } from "react";

// Use State like Function to manage multiple states. Receives a state and an action and returns a new state.
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // Go through all the inputs we have in our form state to find out if all inputs are valid
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
        return {
            inputs: action.inputs,
            isValid: action.isValid
        }
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  // initial state
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  // manage the validity and values of the entire form
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity
    })
  }, []);

  return [formState, inputHandler, setFormData];
};
