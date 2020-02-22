import React from "react";
import { SelectDefault } from "../../utils/SelectDefault/SelectDefault";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { IoIosMenu } from "react-icons/io";

export const FilterItem = ({
  options,
  handleFilter,
  filter,
  setOpen,
  open
}) => {
  return (
    <div>
      <span>
        <SelectDefault
          options={options}
          defaultValue="Selecione algum filtro"
          onSelect={handleFilter}
          selected={filter}
        />
      </span>
      <ButtonDefault type="default" onClick={() => setOpen(!open)}>
        <IoIosMenu color="#fff" opacity="0.9" size="30" />
      </ButtonDefault>
    </div>
  );
};
