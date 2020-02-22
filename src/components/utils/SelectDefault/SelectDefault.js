import React from "react";
import "./select.css";

export const SelectDefault = ({
  options,
  onSelect,
  defaultValue,
  selected
}) => {
  return (
    <select className="select-default" onChange={onSelect}>
      {selected ? null : <option>{defaultValue}</option>}
      {options.map(option => {
        return (
          <option key={option.id} value={option.title}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
};
