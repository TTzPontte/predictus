import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import "../Input.css";

const Select = ({
  label,
  id,
  name = "select",
  defaultValue = "",
  control,
  errors = {},
  type = "text",
  placeholder = "",
  options,
  clsx = "mb-3 input-wrap"
}) => {
  return (
    <Form.Group className={clsx} controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Form.Select
            aria-label="Default select example"
            onChange={onChange}
            value={value}
            ref={ref}
            type={type}
            isInvalid={errors[name]}
            placeholder={placeholder}
          >
            <option>Open this select menu</option>
            {options && options.map(({ label, value }) => <option {...{ value }}>{label}</option>)}
          </Form.Select>
        )}
      />
    </Form.Group>
  );
};
export default Select;
