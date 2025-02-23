import React, { useState } from "react";
import ModalForm from "./Modal";
import { useDispatch } from "react-redux";
import { writeRows } from "./Table";

const AddButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduxDispatch = useDispatch();

  const handleAdd = () => {
    writeRows(reduxDispatch);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalForm
        chain="Añadir"
        formtext="Añade"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />
    </>
  );
};

export default AddButton;
