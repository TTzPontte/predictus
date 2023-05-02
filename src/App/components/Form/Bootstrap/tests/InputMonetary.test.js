import { FormProvider, useForm } from "react-hook-form";
import { screen, render, userEvent, fireEvent } from "../../../../../../tests";
import InputMonetary from "../InputMonetary";

const props = {
  name: "value",
  label: "Valor",
  defaultValue: 0,
};

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<InputMonetary />", () => {
  it("must receive a number and return in currency format", () => {
    render(
      <WrapperForm>
        <InputMonetary {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    fireEvent.change(input, { target: { value: 300000 } });

    expect(input.value).toBe("R$ 300.000,00");
  });

  it("should not allow letters to be inputted", () => {
    render(
      <WrapperForm>
        <InputMonetary {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    fireEvent.change(input, { target: { value: "Pontte Solucões" } });
    
    expect(input.value).toBe("");
  });

});
