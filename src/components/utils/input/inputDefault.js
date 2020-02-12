import React from "react";
import "./input.css";

export const InputDefault = ({
  id,
  type,
  onChange,
  value,
  required,
  name,
  placeholder,
  autoFocus
}) => (
  <input
    id={id}
    type={type}
    onChange={onChange}
    value={value}
    className="input-default"
    required={required}
    name={name}
    placeholder={placeholder}
    autoFocus={autoFocus}
    autoComplete={false}
  />
);
