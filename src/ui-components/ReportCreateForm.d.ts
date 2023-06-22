/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, RadioGroupFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReportCreateFormInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
};
export declare type ReportCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportCreateFormOverridesProps = {
    ReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<RadioGroupFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReportCreateFormProps = React.PropsWithChildren<{
    overrides?: ReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReportCreateFormInputValues) => ReportCreateFormInputValues;
    onSuccess?: (fields: ReportCreateFormInputValues) => void;
    onError?: (fields: ReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReportCreateFormInputValues) => ReportCreateFormInputValues;
    onValidate?: ReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReportCreateForm(props: ReportCreateFormProps): React.ReactElement;
