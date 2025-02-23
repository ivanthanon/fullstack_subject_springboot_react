import AddButton from "./AddButton";
import ModifyButton from "./ModifyButton";
import { DeleteButton } from "./DeleteButton";
import { Table } from "./Table";
import "./form.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Importa el store que configuraste
import "bootstrap/dist/css/bootstrap.min.css";

const MainFront = () => {
  return (
    <Provider store={store}>
      <div style={{ height: 300, width: "100%"}}>
        <Table />
        <div className="buttonPanel">
          <AddButton />
          <ModifyButton />
          <DeleteButton />
        </div>
      </div>
    </Provider>
  );
};

export default MainFront;
