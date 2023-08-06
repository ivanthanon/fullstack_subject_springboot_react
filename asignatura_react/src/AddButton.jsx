import React, { useState } from "react";
import ModalForm from "./Modal";

const AddButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      />
    </>
  );
};

export default AddButton;
