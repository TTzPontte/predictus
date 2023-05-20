/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Frame514Props } from "./Frame514";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Frame514CollectionOverridesProps = {
    Frame514Collection?: PrimitiveOverrideProps<CollectionProps>;
    Frame514?: Frame514Props;
} & EscapeHatchProps;
export declare type Frame514CollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => Frame514Props;
} & {
    overrides?: Frame514CollectionOverridesProps | undefined | null;
}>;
export default function Frame514Collection(props: Frame514CollectionProps): React.ReactElement;
