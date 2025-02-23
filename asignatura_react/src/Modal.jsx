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

    const isFormValid = () => {
      return (
        name && credits && type && year && cuatrimestre && profesorId && gradoId
      );
    };

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
                  <input
                    type="number"
                    value={idem}
                    onChange={handleIdem}
                    required
                  />
                </div>
              )}
              <div>
                <label>Nombre:</label>
                <input value={name} onChange={handleNameChange} required />
              </div>
              <div>
                <label>Creditos:</label>
                <select value={credits} onChange={handleCreditsChange} required>
                  <option value="">Selecciona créditos</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label>Tipo:</label>
                <select value={type} onChange={handleTypeChange} required>
                  <option value="">Selecciona tipo</option>
                  <option value="básica">Básica</option>
                  <option value="obligatoria">Obligatoria</option>
                </select>
              </div>
              <div>
                <label>Curso:</label>
                <select value={year} onChange={handleYearChange} required>
                  <option value="">Selecciona un curso</option>
                  <option value="1">Curso 1</option>
                  <option value="2">Curso 2</option>
                  <option value="3">Curso 3</option>
                  <option value="4">Curso 4</option>
                </select>
              </div>

              <div>
                <label>Cuatrimestre:</label>
                <select
                  value={cuatrimestre}
                  onChange={handleCuatrimestreChange}
                  required
                >
                  <option value="">Selecciona cuatrimestre</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div>
                <label>Profesor:</label>
                <select
                  value={profesorId}
                  onChange={handleProfesorIdChange}
                  required
                >
                  <option value="">Selecciona profesor</option>
                  {/* Aquí deberías mapear los profesores disponibles */}
                  <option value="1">Juan Hernandez</option>
                  <option value="2">Ruben Gomez</option>
                  <option value="3">Carlos Ferran</option>
                  <option value="4">Asdrubal Gonzalez</option>
                  <option value="5">Kilian Perez</option>
                  {/* ... */}
                </select>
              </div>

              <div>
                <label>Grado:</label>
                <select value={gradoId} onChange={handleIdGradoChange} required>
                  <option value="">Selecciona grado</option>
                  {/* Aquí deberías mapear los grados disponibles */}
                  <option value="1">Ing.Infor</option>
                  <option value="2">Física</option>
                  <option value="3">Derecho</option>
                  <option value="4">ADE</option>
                  <option value="5">Ing.Quimica</option>
                  {/* ... */}
                </select>
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                >
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
