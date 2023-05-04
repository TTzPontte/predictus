import { FormProvider, useForm } from "react-hook-form";
import { screen, render, userEvent } from "../../../../../../tests";
import Checkbox from "../Checkbox";

const OPTIONS = [
  {
    label: "Quitar Dividas",
    value: "1"
  },
  {
    label: "Apenas Curiosidade",
    value: "2"
  },
  {
    label: "Outro Motivo",
    value: "3"
  }
];

const props = {
  name: "loanMotivation",
  label: "Qual a motivação desse empréstimo?",
  options: [...OPTIONS],
  setValue: jest.fn(),
};

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<Checkbox />", () => {
  it("must leave selected options checked", () => {
    render(
      <WrapperForm>
        <Checkbox {...props} />
      </WrapperForm>
    );

    const checkboxGroup = screen.getAllByRole("checkbox");

    userEvent.click(checkboxGroup[0]);
    userEvent.click(checkboxGroup[2]);

    expect(checkboxGroup[0].checked).toEqual(true);
    expect(checkboxGroup[1].checked).toEqual(false);
    expect(checkboxGroup[2].checked).toEqual(true);
  });

  it("should return the values selected by the callback", () => {
    render(
      <WrapperForm>
        <Checkbox {...props} />
      </WrapperForm>
    );

    const checkboxGroup = screen.getAllByRole("checkbox");

    userEvent.click(checkboxGroup[0]);
    userEvent.click(checkboxGroup[2]);

    expect(props.setValue).toHaveBeenCalledWith(props.name, [
      checkboxGroup[0].value,
      checkboxGroup[2].value
    ]);
  });
});
