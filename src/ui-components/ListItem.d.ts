/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Report } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { DownloadButtonProps } from "./DownloadButton";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ListItemOverridesProps = {
    ListItem?: PrimitiveOverrideProps<FlexProps>;
    "Frame 507"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1001"?: PrimitiveOverrideProps<FlexProps>;
    "Group 1000"?: PrimitiveOverrideProps<FlexProps>;
    "ellipsis-v 1"?: PrimitiveOverrideProps<ViewProps>;
    Vector38452715?: PrimitiveOverrideProps<IconProps>;
    "ellipsis-v 2"?: PrimitiveOverrideProps<ViewProps>;
    Vector38452717?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 153"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 513"?: PrimitiveOverrideProps<FlexProps>;
    File_name?: PrimitiveOverrideProps<TextProps>;
    "Frame 508"?: PrimitiveOverrideProps<FlexProps>;
    Exhibit38452722?: PrimitiveOverrideProps<FlexProps>;
    Exhibit38452723?: PrimitiveOverrideProps<TextProps>;
    "Frame 509"?: PrimitiveOverrideProps<FlexProps>;
    Everyone?: PrimitiveOverrideProps<TextProps>;
    "Frame 511"?: PrimitiveOverrideProps<FlexProps>;
    "05/01/2023"?: PrimitiveOverrideProps<TextProps>;
    "Frame 512"?: PrimitiveOverrideProps<FlexProps>;
    DownloadButton?: DownloadButtonProps;
} & EscapeHatchProps;
export declare type ListItemProps = React.PropsWithChildren<Partial<FlexProps> & {
    report?: Report;
} & {
    overrides?: ListItemOverridesProps | undefined | null;
}>;
export default function ListItem(props: ListItemProps): React.ReactElement;
