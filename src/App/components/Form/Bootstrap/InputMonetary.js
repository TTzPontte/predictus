import React from "react";
import NumberFormat from "react-number-format";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import infoCycle from "../../../../../images/info-circle-fill.svg";

const InputMonetary = ({
  id,
  label = undefined,
  name = "",
  defaultValue = "",
  control,
  allowNegative = false,
  error,
  formState,
  inputClassLabel = [],
  inputClassGroup = ["mb-3 form-field"],
  isDisabled = false,
  helpInformation = ""
}) => {
  const e = formState?.errors || error;
  const errorMessage = e ? e[name]?.message : null;

  return (
    <>
      <Form.Group
        className={"input " + inputClassGroup.join(" ")}
        controlId={name}
      >
        {!!label && (
          <Form.Label className={`input-label ${inputClassLabel.join(" ")}`}>
            {label}
            {!!helpInformation && (
              <span
                className="help-information"
                data-toggle="tooltip"
                data-placement="top"
                title={helpInformation}
                href="#help"
              >
                <img src={infoCycle} alt="helpicon" />
              </span>
            )}
          </Form.Label>
        )}
        <Controller
          id={id}
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, value, ref } }) => (
            <NumberFormat
              id={id}
              className={`form-control ${errorMessage ? "is-invalid" : ""}`}
              value={value}
              onValueChange={({ floatValue }) => onChange(floatValue)}
              prefix={"R$ "}
              thousandSeparator={"."}
              decimalSeparator={","}
              disabled={isDisabled}
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={allowNegative}
              ref={ref}
              role="textbox"
            />
          )}
        />
        {errorMessage && (
          <span className={"invalid-feedback"}>{errorMessage}</span>
        )}
      </Form.Group>
    </>
  );
};

export default InputMonetary;
