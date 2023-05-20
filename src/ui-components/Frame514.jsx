/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function Frame514(props) {
  const { report, overrides, ...rest } = props;
  const downloadOnClick = useNavigateAction({ type: "url", url: report?.link });
  return (
    <Flex
      gap="24px"
      direction="row"
      width="1590px"
      height="64px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      border="1px SOLID rgba(208,208,206,1)"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Frame514")}
      {...rest}
    >
      <Flex
        gap="16px"
        direction="row"
        width="87px"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="16px 8px 16px 8px"
        {...getOverrideProps(overrides, "Frame 507")}
      >
        <Flex
          padding="0px 0px 0px 0px"
          width="6px"
          height="16px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          {...getOverrideProps(overrides, "Group 1000")}
        >
          <View
            width="2px"
            height="16px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            position="absolute"
            top="0px"
            left="0px"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "ellipsis-v 1")}
          >
            <Icon
              width="2px"
              height="9.5px"
              viewBox={{ minX: 0, minY: 0, width: 2, height: 9.5 }}
              paths={[
                {
                  d: "M1 3.75C1.55313 3.75 2 4.19688 2 4.75C2 5.30312 1.55313 5.75 1 5.75C0.446875 5.75 0 5.30312 0 4.75C0 4.19688 0.446875 3.75 1 3.75ZM0 1C0 1.55313 0.446875 2 1 2C1.55313 2 2 1.55313 2 1C2 0.446875 1.55313 0 1 0C0.446875 0 0 0.446875 0 1ZM0 8.5C0 9.05313 0.446875 9.5 1 9.5C1.55313 9.5 2 9.05313 2 8.5C2 7.94688 1.55313 7.5 1 7.5C0.446875 7.5 0 7.94688 0 8.5Z",
                  fill: "rgba(208,208,206,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="20.31%"
              bottom="20.31%"
              left="0%"
              right="0%"
              {...getOverrideProps(overrides, "Vector38802472")}
            ></Icon>
          </View>
          <View
            width="2px"
            height="16px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            position="absolute"
            top="0px"
            left="4px"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "ellipsis-v 2")}
          >
            <Icon
              width="2px"
              height="9.5px"
              viewBox={{ minX: 0, minY: 0, width: 2, height: 9.5 }}
              paths={[
                {
                  d: "M1 3.75C1.55313 3.75 2 4.19688 2 4.75C2 5.30312 1.55313 5.75 1 5.75C0.446875 5.75 0 5.30312 0 4.75C0 4.19688 0.446875 3.75 1 3.75ZM0 1C0 1.55313 0.446875 2 1 2C1.55313 2 2 1.55313 2 1C2 0.446875 1.55313 0 1 0C0.446875 0 0 0.446875 0 1ZM0 8.5C0 9.05313 0.446875 9.5 1 9.5C1.55313 9.5 2 9.05313 2 8.5C2 7.94688 1.55313 7.5 1 7.5C0.446875 7.5 0 7.94688 0 8.5Z",
                  fill: "rgba(208,208,206,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="20.31%"
              bottom="20.31%"
              left="0%"
              right="0%"
              {...getOverrideProps(overrides, "Vector38802474")}
            ></Icon>
          </View>
        </Flex>
        <View
          width="16px"
          height="16px"
          {...getOverrideProps(overrides, "Rectangle 153")}
        ></View>
      </Flex>
      <Flex
        gap="8px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="16px 0px 16px 0px"
        {...getOverrideProps(overrides, "Frame 513")}
      >
        <Text
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight="500"
          color="rgba(106,106,101,1)"
          lineHeight="14px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={report?.fileName}
          {...getOverrideProps(overrides, "File_name")}
        ></Text>
      </Flex>
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="16px 0px 16px 0px"
        {...getOverrideProps(overrides, "Frame 508")}
      >
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          borderRadius="50px"
          padding="6px 6px 6px 6px"
          backgroundColor="rgba(229,245,228,1)"
          {...getOverrideProps(overrides, "Exhibit38802479")}
        >
          <Text
            fontFamily="Montserrat"
            fontSize="12px"
            fontWeight="600"
            color="rgba(63,139,53,1)"
            lineHeight="12px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            letterSpacing="0px"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={report?.status}
            {...getOverrideProps(overrides, "Exhibit38802480")}
          ></Text>
        </Flex>
      </Flex>
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="16px 0px 16px 0px"
        {...getOverrideProps(overrides, "Frame 509")}
      >
        <Text
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight="500"
          color="rgba(106,106,101,1)"
          lineHeight="14px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={report?.id}
          {...getOverrideProps(overrides, "Everyone")}
        ></Text>
      </Flex>
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="16px 0px 16px 0px"
        {...getOverrideProps(overrides, "Frame 511")}
      >
        <Text
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight="500"
          color="rgba(106,106,101,1)"
          lineHeight="14px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={report?.createdAt}
          {...getOverrideProps(overrides, "05/01/2023")}
        ></Text>
      </Flex>
      <Flex
        gap="8px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="16px 16px 16px 0px"
        {...getOverrideProps(overrides, "Frame 512")}
      >
        <Text
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight="500"
          color="rgba(0,77,235,1)"
          lineHeight="14px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="0px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Download"
          onClick={() => {
            downloadOnClick();
          }}
          {...getOverrideProps(overrides, "Download")}
        ></Text>
      </Flex>
    </Flex>
  );
}
