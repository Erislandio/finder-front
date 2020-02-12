import React from "react";
import './button.css'

export const ButtonDefault = ({ children, id, type, onClick }) => {
  return (
    <button id={id} className="btn-default" type={type} onClick={onClick}>
      {children}
    </button>
  );
};
