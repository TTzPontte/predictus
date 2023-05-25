/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBar2OverridesProps = {
    NavBar2?: PrimitiveOverrideProps<FlexProps>;
    Logo?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100137482691"?: PrimitiveOverrideProps<FlexProps>;
    Group?: PrimitiveOverrideProps<FlexProps>;
    Vector37482693?: PrimitiveOverrideProps<IconProps>;
    Vector37482694?: PrimitiveOverrideProps<IconProps>;
    Pontte?: PrimitiveOverrideProps<TextProps>;
    "Frame 32137482696"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100137482697"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100137482698"?: PrimitiveOverrideProps<FlexProps>;
    Create?: PrimitiveOverrideProps<TextProps>;
    "Frame 100137482700"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100137482701"?: PrimitiveOverrideProps<FlexProps>;
    List?: PrimitiveOverrideProps<TextProps>;
    "Frame 32137482703"?: PrimitiveOverrideProps<FlexProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    Vector37482705?: PrimitiveOverrideProps<IconProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type NavBar2Props = React.PropsWithChildren<Partial<FlexProps> & {
    createUrl?: String;
    listUrl?: String;
    avatarUrl?: String;
} & {
    overrides?: NavBar2OverridesProps | undefined | null;
}>;
export default function NavBar2(props: NavBar2Props): React.ReactElement;
