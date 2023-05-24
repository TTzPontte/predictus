/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "@aws-amplify/ui-react/internal";
import { View } from "@aws-amplify/ui-react";
import Ucheck from "./Ucheck";
export default function Checkbox(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      variantValues: { checkbox: "Checked" },
      overrides: { "Rectangle 128": {}, "u:check": {}, Checkbox: {} },
    },
    {
      variantValues: { checkbox: "Unchecked" },
      overrides: {
        "Rectangle 128": {
          backgroundColor: "rgba(255,255,255,1)",
          border: "1px SOLID rgba(185,185,185,1)",
        },
        "u:check": { display: "none" },
        Checkbox: {},
      },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="32px"
      height="32px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Checkbox")}
      {...rest}
    >
      <View
        width="32px"
        height="32px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        borderRadius="4px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(45,104,254,1)"
        {...getOverrideProps(overrides, "Rectangle 128")}
      ></View>
      <Ucheck
        width="24px"
        height="24px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="12.5%"
        bottom="12.5%"
        left="12.5%"
        right="12.5%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "u:check")}
      ></Ucheck>
    </View>
  );
}
