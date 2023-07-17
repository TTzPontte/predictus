/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function LogOutButton(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      width="180px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      border="1px SOLID rgba(0,0,0,0)"
      borderRadius="4px"
      padding="7px 15px 7px 15px"
      backgroundColor="rgba(4,125,149,1)"
      {...getOverrideProps(overrides, "LogOutButton")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="700"
        color="rgba(255,255,255,1)"
        lineHeight="30px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Log Out"
        {...getOverrideProps(overrides, "label")}
      ></Text>
    </Flex>
  );
}
