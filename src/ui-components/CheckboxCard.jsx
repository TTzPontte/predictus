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
import Checkbox from "./Checkbox";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function CheckboxCard(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      variantValues: { type: "Unchecked", title: "True" },
      overrides: {
        Checkbox: {},
        "Card Title": {},
        "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.":
          {},
        "Text Body": {},
        CheckboxCard: {},
      },
    },
    {
      variantValues: { type: "Unchecked", title: "False" },
      overrides: {
        Checkbox: {},
        "Card Title": { display: "none" },
        "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.":
          {},
        "Text Body": {},
        CheckboxCard: {},
      },
    },
    {
      variantValues: { type: "Checked", title: "True" },
      overrides: {
        Checkbox: { checkbox: "Checked" },
        "Card Title": {},
        "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.":
          {},
        "Text Body": {},
        CheckboxCard: {},
      },
    },
    {
      variantValues: { type: "Checked", title: "False" },
      overrides: {
        Checkbox: { checkbox: "Checked" },
        "Card Title": { display: "none" },
        "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.":
          {},
        "Text Body": {},
        CheckboxCard: {},
      },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="16px"
      direction="row"
      width="393px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="24px 24px 24px 24px"
      display="flex"
      {...getOverrideProps(overrides, "CheckboxCard")}
      {...rest}
    >
      <Checkbox
        width="24px"
        height="24px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        checkbox="Unchecked"
        {...getOverrideProps(overrides, "Checkbox")}
      ></Checkbox>
      <Flex
        gap="12px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        display="flex"
        {...getOverrideProps(overrides, "Text Body")}
      >
        <Text
          fontFamily="Inter"
          fontSize="24px"
          fontWeight="600"
          color="rgba(24,24,24,1)"
          lineHeight="32px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Card Title"
          {...getOverrideProps(overrides, "Card Title")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(71,71,71,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card."
          {...getOverrideProps(
            overrides,
            "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card."
          )}
        ></Text>
      </Flex>
    </Flex>
  );
}
