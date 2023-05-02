import { FormProvider, useForm } from "react-hook-form";
import { screen, render, userEvent, fireEvent } from "../../../../../../tests";
import InputMask from "../InputMask";

const props = {
  name: "cepValeu",
  label: "Digite o CEP:",
  defaultValue: 0,
  mask: "99.999-999"
};

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<InputMask />", () => {
  it("must receive a text and return it formatted with the mask", () => {
    render(
      <WrapperForm>
        <InputMask {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    fireEvent.change(input, { target: { value: 13735400 } });

    expect(input.value).toBe("13.735-400"); 
  });

});
