import React, { useState } from "react";
import "./form.css";
import Button from "react-bootstrap/Button";


const ModalForm = (props) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [profesorId, setProfesorId] = useState("");
  const [gradoId, setGradoId] = useState("");
  const [idem, setIdem] = useState("");

  const handleIdem = (event) => {
    setIdem(event.target.value);
  };

  const handleCreditsChange = (event) => {
    setCredits(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleIdGradoChange = (event) => {
    setGradoId(event.target.value);
  };

  const handleProfesorIdChange = (event) => {
    setProfesorId(event.target.value);
  };

  const handleCuatrimestreChange = (event) => {
    setCuatrimestre(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    cleanModal();
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    let url = "http://localhost:8080/addUser";
    event.preventDefault();

    let requestData = {
      name: name,
      credits: credits,
      year: year,
      type: type,
      cuatrimestre: cuatrimestre,
      gradoId: gradoId,
      profesorId: profesorId,
    };

    if (props.chain === "Modificar") {
      url = "http://localhost:8080/updateUser";
      requestData = {
        name: name,
        credits: credits,
        year: year,
        type: type,
        cuatrimestre: cuatrimestre,
        gradoId: gradoId,
        profesorId: profesorId,
        ident: idem,
      };

    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.text();
      console.log("Response from server:", responseData);




    } catch (error) {
      console.error("Error:", error);
    }

    cleanModal();
    handleCloseModal();
  };

  function cleanModal() {
    setIdem("");
    setName("");
    setCredits("");
    setType("");
    setYear("");
    setCuatrimestre("");
    setProfesorId("");
    setGradoId("");
  }

  return (
    <>
      <Button onClick={handleOpenModal}>{props.chain}</Button>

      {isModalOpen && (
        <div className="container">
          <div className="into">
            <h2>{props.formtext} una asignatura</h2>
            <form>
              {props.chain === "Modificar" && (
                <div>
                  <label>ID:</label>
                  <input value={idem} onChange={handleIdem} required />
                </div>
              )}
              <div>
                <label>Nombre:</label>
                <input value={name} onChange={handleNameChange} required />
              </div>
              <div>
                <label>Creditos:</label>
                <input
                  value={credits}
                  onChange={handleCreditsChange}
                  required
                />
              </div>
              <div>
                <label>Tipo:</label>
                <input value={type} onChange={handleTypeChange} required />
              </div>
              <div>
                <label>Curso:</label>
                <input value={year} onChange={handleYearChange} required />
              </div>

              <div>
                <label>Cuatrimestre:</label>
                <input
                  value={cuatrimestre}
                  onChange={handleCuatrimestreChange}
                  required
                />
              </div>
              <div>
                <label>Id Profesor:</label>
                <input
                  value={profesorId}
                  onChange={handleProfesorIdChange}
                  required
                />
              </div>

              <div>
                <label>Id Grado:</label>
                <input
                  value={gradoId}
                  onChange={handleIdGradoChange}
                  required
                />
              </div>
              <div className="buttons">
                <button type="submit" onClick={handleSubmit}>
                  Enviar
                </button>
                <button onClick={handleCloseModal}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;