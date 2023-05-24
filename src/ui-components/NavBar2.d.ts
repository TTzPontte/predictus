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
    Group?: PrimitiveOverrideProps<FlexProps>;
    Vector38612468?: PrimitiveOverrideProps<IconProps>;
    Vector38612469?: PrimitiveOverrideProps<IconProps>;
    Pontte?: PrimitiveOverrideProps<TextProps>;
    "Frame 32138582584"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100138622466"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100138622468"?: PrimitiveOverrideProps<FlexProps>;
    Create?: PrimitiveOverrideProps<TextProps>;
    "Frame 100138622467"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 100138622469"?: PrimitiveOverrideProps<FlexProps>;
    List?: PrimitiveOverrideProps<TextProps>;
    "Frame 32138582587"?: PrimitiveOverrideProps<FlexProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    Vector38582589?: PrimitiveOverrideProps<IconProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type NavBar2Props = React.PropsWithChildren<Partial<FlexProps> & {
    listUrl?: String;
    createUrl?: String;
} & {
    overrides?: NavBar2OverridesProps | undefined | null;
}>;
export default function NavBar2(props: NavBar2Props): React.ReactElement;
