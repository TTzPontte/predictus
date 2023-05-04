import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import infoCycle from "../../../../../images/info-circle-fill.svg";

const LargeTextInput = ({
  name = "textInput",
  id = "basic-addon1",
  placeholder = "Aa",
  label = "With textarea",
  isDisabled = false,
  defaultValue = "",
  helpInformation=""
}) => (
  <Form.Group className="mb-3 input full">
    <Form.Label
      htmlFor={id}
      style={{ marginBottom: 0 }}
      className="input-label"
    >
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
    <Controller
      id={id}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <Form.Control
          {...rest}
          id={id}
          onChange={onChange}
          value={value}
          ref={ref}
          as={"textarea"}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={6}
        />
      )}
    />
  </Form.Group>
);

export default LargeTextInput;
