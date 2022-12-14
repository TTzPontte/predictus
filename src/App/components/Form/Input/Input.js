import { Controller, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import React, { useEffect } from "react";
import "../Input.css";
import { Form, InputGroup } from "react-bootstrap";

const Input = (props) => {
  const {
    label,
    id,
    name,
    value = "",
    disabled = false,
    type = "text",
    mask = null,
    maskChar = null,
    placeholder = "",
    percentage = false,
    wrapClass = ["input-wrap"],
    defaultValue,
  } = props;

  const methods = useFormContext();
  const newLabel = label ? label : name;
  const newId = id ? id : name;
  return (
    <>
      <InputGroup className={`mb-3 ${wrapClass.join(" ")}`}>
        <label htmlFor={newId}>
          <span className="input-title">{newLabel}</span>
        </label>
        <Controller
          render={({ field, setValue, value }) => (
            <InputMask
              className=" input"
              {...{
                ...field,
                id:newId,
                type,
                mask,
                maskChar,
                placeholder,
                defaultValue,
              }}
              setValue={setValue}
              disabled={disabled}
            />
          )}
          control={methods.control}
          name={name}
        />
      </InputGroup>
    </>
  );
};
export default Input;
