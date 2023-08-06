import React, { useState } from "react";
import MainFront from "./MainFront";
// index.js (o App.js o cualquier otro archivo principal)
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
       {/** */}
      {/* Botón para cambiar el front-end */}
      {!mostrarNuevoFrontend && (
        <div className="bd">
          <Button onClick={handleMostrarFrontend} className="bd">
            Connect to BD!
          </Button>
        </div>
      )}

      {/* Mostrar el nuevo front-end si mostrarNuevoFrontend es true */}
      {mostrarNuevoFrontend && <MainFront />}
    </div>
  );
};

export default App;
