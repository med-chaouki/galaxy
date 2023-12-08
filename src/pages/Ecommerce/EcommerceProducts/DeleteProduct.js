// DeleteProduct.js
import React from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";

const DeleteProduct = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <DeleteModal show={show} onDeleteClick={onDeleteClick} onCloseClick={onCloseClick} />
  );
};

export default DeleteProduct;
