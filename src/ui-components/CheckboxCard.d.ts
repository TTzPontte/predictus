/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CheckboxProps } from "./Checkbox";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckboxCardOverridesProps = {
    CheckboxCard?: PrimitiveOverrideProps<FlexProps>;
    Checkbox?: CheckboxProps;
    "Text Body"?: PrimitiveOverrideProps<FlexProps>;
    "Card Title"?: PrimitiveOverrideProps<TextProps>;
    "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card."?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type CheckboxCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    title?: "False" | "True";
    type?: "Checked" | "Unchecked";
} & {
    overrides?: CheckboxCardOverridesProps | undefined | null;
}>;
export default function CheckboxCard(props: CheckboxCardProps): React.ReactElement;
