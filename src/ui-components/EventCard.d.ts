/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BadgeProps, DividerProps, FlexProps, IconProps, ImageProps, RatingProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCardOverridesProps = {
    "14"?: PrimitiveOverrideProps<TextProps>;
    EventCard?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2238542428"?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Card Area"?: PrimitiveOverrideProps<FlexProps>;
    Title?: PrimitiveOverrideProps<FlexProps>;
    Frame?: PrimitiveOverrideProps<FlexProps>;
    "Information about this product"?: PrimitiveOverrideProps<TextProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "Classic Long Sleeve T-Shirt"?: PrimitiveOverrideProps<TextProps>;
    Divider?: PrimitiveOverrideProps<DividerProps>;
    Features?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2238542439"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2238542440"?: PrimitiveOverrideProps<FlexProps>;
    "Information about this product.38542441"?: PrimitiveOverrideProps<TextProps>;
    "Information about this product.38542442"?: PrimitiveOverrideProps<TextProps>;
    "Frame 2238542443"?: PrimitiveOverrideProps<FlexProps>;
    Date?: PrimitiveOverrideProps<FlexProps>;
    APR?: PrimitiveOverrideProps<TextProps>;
    Badge?: PrimitiveOverrideProps<BadgeProps>;
    "Bottom Row"?: PrimitiveOverrideProps<FlexProps>;
    Rating38542449?: PrimitiveOverrideProps<FlexProps>;
    Rating38542450?: PrimitiveOverrideProps<RatingProps>;
    Reviews?: PrimitiveOverrideProps<TextProps>;
    $99?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type EventCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: EventCardOverridesProps | undefined | null;
}>;
export default function EventCard(props: EventCardProps): React.ReactElement;
