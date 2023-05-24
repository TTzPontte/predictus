/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarketingexampleOverridesProps = {
    Marketingexample?: PrimitiveOverrideProps<ViewProps>;
    Features4x1?: PrimitiveOverrideProps<FlexProps>;
    Features2x2?: PrimitiveOverrideProps<FlexProps>;
    HeroLayout2?: PrimitiveOverrideProps<ViewProps>;
    Card38542685?: PrimitiveOverrideProps<FlexProps>;
    Card38542686?: PrimitiveOverrideProps<FlexProps>;
    Card38542687?: PrimitiveOverrideProps<FlexProps>;
    Card38542688?: PrimitiveOverrideProps<FlexProps>;
    NavBar?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type MarketingexampleProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: MarketingexampleOverridesProps | undefined | null;
}>;
export default function Marketingexample(props: MarketingexampleProps): React.ReactElement;
