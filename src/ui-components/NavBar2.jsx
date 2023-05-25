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
import { Flex, Icon, Image, Text, View } from "@aws-amplify/ui-react";
export default function NavBar2(props) {
  const {
    createUrl,
    listUrl,
    avatarUrl = "https://img.freepik.com/premium-psd/3d-cartoon-character-avatar-isolated-3d-rendering_235528-548.jpg?w=2000",
    onClickAvatar,
    overrides,
    ...rest
  } = props;
  const createOnClick = useNavigateAction({ type: "url", url: createUrl });
  const frameOneZeroZeroOneThreeSevenFourEightTwoSevenZeroZeroOnClick =
    useNavigateAction({ type: "url", url: listUrl });
  return (
    <Flex
      gap="20px"
      direction="row"
      width="1440px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      border="1px SOLID rgba(174,179,183,1)"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      padding="23px 31px 23px 31px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NavBar2")}
      {...rest}
    >
      <Flex
        gap="7px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Logo")}
      >
        <Flex
          gap="7px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 100137482691")}
        >
          <Flex
            padding="0px 0px 0px 0px"
            width="53px"
            height="44.16px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            {...getOverrideProps(overrides, "Group")}
          >
            <Icon
              width="41.89px"
              height="24.66px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 41.886962890625,
                height: 24.65625,
              }}
              paths={[
                {
                  d: "M8.26198 15.291C8.70508 16.0318 9.76852 16.6491 10.637 16.6491L16.9822 16.6491C17.8507 16.6491 18.9141 17.2664 19.3395 18.0071L22.3526 23.2981C22.778 24.0565 23.8414 24.6561 24.7099 24.6561L40.9096 24.6561C41.7781 24.6561 42.1326 24.0389 41.7072 23.2981L28.9814 1.35803C28.5383 0.599649 27.4748 0 26.6063 0L0.977407 0C0.10893 0 -0.24555 0.617285 0.179826 1.37566L8.26198 15.291Z",
                  fill: "rgba(92,59,107,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="0%"
              bottom="44.17%"
              left="20.97%"
              right="0%"
              {...getOverrideProps(overrides, "Vector37482693")}
            ></Icon>
            <Icon
              width="41.89px"
              height="24.66px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 41.886962890625,
                height: 24.65625,
              }}
              paths={[
                {
                  d: "M8.26198 15.291C8.70508 16.0318 9.76852 16.6491 10.637 16.6491L16.9822 16.6491C17.8507 16.6491 18.9141 17.2664 19.3395 18.0071L22.3526 23.2981C22.778 24.0565 23.8414 24.6561 24.7099 24.6561L40.9096 24.6561C41.7781 24.6561 42.1326 24.0389 41.7072 23.2981L28.9814 1.35803C28.5383 0.599649 27.4748 0 26.6063 0L0.977407 0C0.10893 0 -0.24555 0.617286 0.179826 1.37567L8.26198 15.291Z",
                  fill: "rgba(92,59,107,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="44.17%"
              bottom="0%"
              left="0%"
              right="20.97%"
              {...getOverrideProps(overrides, "Vector37482694")}
            ></Icon>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        gap="40px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32137482696")}
      >
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          border="1px SOLID rgba(174,179,183,1)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 100137482697")}
        >
          <Flex
            gap="12px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 14px 0px 14px"
            backgroundColor="rgba(4,125,149,1)"
            {...getOverrideProps(overrides, "Frame 100137482698")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(255,255,255,1)"
              lineHeight="24px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              letterSpacing="0.01px"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Create"
              onClick={() => {
                createOnClick();
              }}
              {...getOverrideProps(overrides, "Create")}
            ></Text>
          </Flex>
        </Flex>
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          border="1px SOLID rgba(174,179,183,1)"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(4,125,149,1)"
          onClick={() => {
            frameOneZeroZeroOneThreeSevenFourEightTwoSevenZeroZeroOnClick();
          }}
          {...getOverrideProps(overrides, "Frame 100137482700")}
        >
          <Flex
            gap="12px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 14px 0px 14px"
            {...getOverrideProps(overrides, "Frame 100137482701")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(255,255,255,1)"
              lineHeight="24px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              letterSpacing="0.01px"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="List"
              {...getOverrideProps(overrides, "List")}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        gap="32px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32137482703")}
      >
        <View
          width="24px"
          height="24px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Icon")}
        >
          <Icon
            width="16px"
            height="19.5px"
            viewBox={{ minX: 0, minY: 0, width: 16, height: 19.5 }}
            paths={[
              {
                d: "M8 19.5C9.1 19.5 10 18.6 10 17.5L6 17.5C6 18.6 6.9 19.5 8 19.5ZM14 13.5L14 8.5C14 5.43 12.37 2.86 9.5 2.18L9.5 1.5C9.5 0.67 8.83 0 8 0C7.17 0 6.5 0.67 6.5 1.5L6.5 2.18C3.64 2.86 2 5.42 2 8.5L2 13.5L0 15.5L0 16.5L16 16.5L16 15.5L14 13.5ZM12 14.5L4 14.5L4 8.5C4 6.02 5.51 4 8 4C10.49 4 12 6.02 12 8.5L12 14.5Z",
                fill: "rgba(51,51,51,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="10.42%"
            bottom="8.33%"
            left="16.67%"
            right="16.67%"
            {...getOverrideProps(overrides, "Vector37482705")}
          ></Icon>
        </View>
        <Image
          width="45px"
          height="45px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          borderRadius="160px"
          padding="0px 0px 0px 0px"
          objectFit="cover"
          src={avatarUrl}
          onClick={onClickAvatar}
          {...getOverrideProps(overrides, "image")}
        ></Image>
      </Flex>
    </Flex>
  );
}
