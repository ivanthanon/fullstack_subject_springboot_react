import AddButton from "./AddButton";
import ModifyButton from "./ModifyButton";
import { DeleteButton } from "./DeleteButton";
import { Table } from "./Table";
import "./form.css";

import "bootstrap/dist/css/bootstrap.min.css";

const MainFront = () => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <Table />
      <div className="buttonPanel">
        <AddButton />
        <ModifyButton />
        <DeleteButton />
      </div>
    </div>
  );
};

export default MainFront;
