import React from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export const ConnectForm = ({ children }) => {
  const methods = useFormContext();
  return children({ ...methods });
};

export const HookForm = ({ onSubmit, children, formValues, classNames }) => {
  const methods = useForm({ ...formValues });

  return (
    <FormProvider {...methods}>
      <form className={classNames} onSubmit={methods.handleSubmit(onSubmit)}>
        {children({ ...methods })}
      </form>
    </FormProvider>
  );
};
HookForm.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.any,
  formValues: PropTypes.object,
  classNames: PropTypes.string
};
/*
Example of a DeepNest input component
export const DeepNest = () => (
  <ConnectForm>
    {({ register }) => <input ref={register} name="deepNestedInput"/>}
  </ConnectForm>
);
*/
