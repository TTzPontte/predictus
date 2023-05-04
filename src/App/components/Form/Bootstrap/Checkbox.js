import { useFormContext } from "react-hook-form";

const Checkbox = ({ label = "2", name = "group1", options = [], disabled = false, inline = true }) => {
  const methods = useFormContext();
  const { register } = methods;

  return (
    <>
      <div className="input mb-3">
        <label>{label}</label>
        {options.map(({ value, label }, index) => (
          <div key={`inline-${name}-${"checkbox"}-${index}`} className="mb-3">
            <input
              {...register(`${name}.${index}`)}
              id={`inline-${name}-${"checkbox"}-${index}`}
              type="checkbox"
              name={`${name}.${index}`}
              value={value}
              disabled={disabled}
              defaultChecked={false}
            />
            <label htmlFor={`inline-${name}-${"checkbox"}-${index}`}>{label}</label>
          </div>
        ))}
      </div>
    </>
  );
};
export default Checkbox;
