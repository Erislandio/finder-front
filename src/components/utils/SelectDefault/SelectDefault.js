import React from "react";
import "./select.css";

export const SelectDefault = ({
  options,
  onSelect,
  defaultValue,
  selected,
  loadingData
}) => {
  return (
    <select
      disabled={loadingData}
      className="select-default"
      onChange={e => onSelect(e)}
    >
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
