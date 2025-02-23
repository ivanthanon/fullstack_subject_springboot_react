import React from "react";
import Button from "react-bootstrap/Button";
import { idmarcado } from "./Table";
import { useDispatch } from "react-redux";
import { updateRows } from "./actions"; // Importa la acción updateRows
import { writeRows } from "./Table";

export function DeleteButton() {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const id = idmarcado(); // Asegúrate de que idmarcado() esté disponible aquí

    if (id !== null) {
      try {
        const response = await fetch("http://localhost:8080/deleteUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        });

        if (response.ok) {
          console.log(`Elemento con id ${id} eliminado exitosamente`);
          dispatch(updateRows([]));
          writeRows();
        } else {
          console.error(`Error al eliminar el elemento con id ${id}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    } else {
      alert("SELECCIONA UNA FILA")
    }
  };

  return <Button onClick={handleDelete}>Eliminar</Button>;
}
