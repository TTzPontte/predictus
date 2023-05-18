/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Report } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReportUpdateFormInputValues = {
    link?: string;
    status?: string;
    fileName?: string;
};
export declare type ReportUpdateFormValidationValues = {
    link?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportUpdateFormOverridesProps = {
    ReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
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
