import { Form, FormCheck } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import "./styles.scss";

const curateOptions = (list) => {
  const isStrArray = list.every((item) => typeof item === "string");

  if (isStrArray) {
    return list.map((item) => ({ value: item, label: item }));
  }

  return list;
};

const Radio = ({
  label = "",
  name = "group1",
  options = [],
  isDisabled = false,
  inline = true,
  defaultChecked = "",
  inputClassLabel = [],
  helpInformation = "",
  simpleRadio = false
}) => {
  const { control } = useFormContext();

  const classNames = ["block"];

  if (inline) {
    classNames.pop();
    classNames.push("inline");
  }

  const styles = classNames.join(" ");

  return (
    <Form.Group className="input mb-3" controlId={name}>
      <Form.Label className={`radio-label input-label ${inputClassLabel.join(" ")}`}>
        {label}
        {!!helpInformation && (
          <span
            className="help-information"
            data-toggle="tooltip"
            data-placement="top"
            title={helpInformation}
            href="#help"
          >
            {/*<img src={infoCycle} alt="helpicon" />*/}
          </span>
        )}
      </Form.Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultChecked}
        render={({ field: { ref, onChange } }) => (
          <div key={`${name}-${"radio"}`} className={"radio radio__".concat(styles)}>
            {curateOptions(options).map(({ value, label: optionLabel }, index) => (
              <FormCheck
                {...{
                  key: `${value}-${"radio"}-${name}-${index}`,
                  id: `${value}-${"radio"}-${name}-${index}`,
                  type: "radio",
                  className: `radio-item ${simpleRadio ? "simple" : "buttons"}`,
                  label: optionLabel,
                  defaultChecked: defaultChecked === value,
                  name,
                  value,
                  onChange,
                  disabled: isDisabled,
                  inline,
                  ref
                }}
              />
            ))}
          </div>
        )}
      />
    </Form.Group>
  );
};

export default Radio;
