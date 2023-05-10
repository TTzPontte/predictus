/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Report } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReportUpdateFormInputValues = {
    documentNumber?: string;
    pipefyId?: string;
    type?: string;
    status?: string;
};
export declare type ReportUpdateFormValidationValues = {
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportUpdateFormOverridesProps = {
    ReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    report?: Report;
    onSubmit?: (fields: ReportUpdateFormInputValues) => ReportUpdateFormInputValues;
    onSuccess?: (fields: ReportUpdateFormInputValues) => void;
    onError?: (fields: ReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReportUpdateFormInputValues) => ReportUpdateFormInputValues;
    onValidate?: ReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReportUpdateForm(props: ReportUpdateFormProps): React.ReactElement;
