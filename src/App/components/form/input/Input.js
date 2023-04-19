import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";

const Input = ({
  name = "textInput",
  id = "basic-addon1",
  placeholder = "",
  label = "With textarea",
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Text id={id}>{label}</InputGroup.Text>
    <Controller
      name={name || id}
      render={({ field: { onChange, value, ref } }) => (
        <Form.Control
          onChange={onChange}
          value={value}
          ref={ref}
          as={"textarea"}
          placeholder={placeholder}
        />
      )}
    />
  </InputGroup>
);

export default Input;