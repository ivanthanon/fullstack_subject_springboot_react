import { createStore } from "redux";

// Definir el estado inicial
const initialState = {
  rows: [], // Aquí almacenaremos los datos de las filas
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ROWS":
      return {
        ...state,
        rows: action.payload,
      };
    default:
      return state;
  }
};

// Crear el store
const store = createStore(rootReducer);

export default store;
