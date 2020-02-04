import React from "react";
import "./container.css";

export const Container = ({ children, id }) => (
  <div id={id} className="container">
    {children}
  </div>
);
