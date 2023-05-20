/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Report } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Frame514OverridesProps = {
    Frame514?: PrimitiveOverrideProps<FlexProps>;
    "Frame 507"?: PrimitiveOverrideProps<FlexProps>;
    "Group 1000"?: PrimitiveOverrideProps<FlexProps>;
    "ellipsis-v 1"?: PrimitiveOverrideProps<ViewProps>;
    Vector38802472?: PrimitiveOverrideProps<IconProps>;
    "ellipsis-v 2"?: PrimitiveOverrideProps<ViewProps>;
    Vector38802474?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 153"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 513"?: PrimitiveOverrideProps<FlexProps>;
    File_name?: PrimitiveOverrideProps<TextProps>;
    "Frame 508"?: PrimitiveOverrideProps<FlexProps>;
    Exhibit38802479?: PrimitiveOverrideProps<FlexProps>;
    Exhibit38802480?: PrimitiveOverrideProps<TextProps>;
    "Frame 509"?: PrimitiveOverrideProps<FlexProps>;
    Everyone?: PrimitiveOverrideProps<TextProps>;
    "Frame 511"?: PrimitiveOverrideProps<FlexProps>;
    "05/01/2023"?: PrimitiveOverrideProps<TextProps>;
    "Frame 512"?: PrimitiveOverrideProps<FlexProps>;
    Download?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Frame514Props = React.PropsWithChildren<Partial<FlexProps> & {
    report?: Report;
} & {
    overrides?: Frame514OverridesProps | undefined | null;
}>;
export default function Frame514(props: Frame514Props): React.ReactElement;
