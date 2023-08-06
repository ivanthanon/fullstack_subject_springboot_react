import React from "react";
import Button from "react-bootstrap/Button";
import { idmarcado } from "./Table";

export function DeleteButton() {
  const handleDelete = async () => {
    const id = idmarcado();

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
        } else {
          console.error(`Error al eliminar el elemento con id ${id}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return <Button onClick={handleDelete}>Eliminar</Button>;
}
