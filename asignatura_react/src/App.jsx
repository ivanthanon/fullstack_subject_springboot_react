import React, { useState } from "react";
import MainFront from "./MainFront";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./form.css";

const App = () => {
  const [mostrarNuevoFrontend, setMostrarNuevoFrontend] = useState(false);

  const handleMostrarFrontend = () => {
    //try connection with backend
    setMostrarNuevoFrontend(true);
  };

  return (
    <div>
      {!mostrarNuevoFrontend && (
        <div className="bd">
          <Button onClick={handleMostrarFrontend} className="bd">
            Ver lista de asignaturas
          </Button>
        </div>
      )}

      {mostrarNuevoFrontend && <MainFront />}
    </div>
  );
};

export default App;
