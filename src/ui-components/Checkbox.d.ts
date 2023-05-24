/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
import { UcheckProps } from "./Ucheck";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckboxOverridesProps = {
    Checkbox?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 128"?: PrimitiveOverrideProps<ViewProps>;
    "u:check"?: UcheckProps;
} & EscapeHatchProps;
export declare type CheckboxProps = React.PropsWithChildren<Partial<ViewProps> & {
    checkbox?: "Checked" | "Unchecked";
} & {
    overrides?: CheckboxOverridesProps | undefined | null;
}>;
export default function Checkbox(props: CheckboxProps): React.ReactElement;
