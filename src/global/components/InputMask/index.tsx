import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { ActivityIndicator, TextInputProps } from "react-native";
import { Icon } from "../Icon";
import Text from "../Text";
import * as S from "./styles";
import { IIconList } from "@global/styles/icons";
import { TextInputMaskTypeProp } from "react-native-masked-text";
import theme from "@global/styles/theme";

interface Props extends TextInputProps {
  title?: string;
  isActivePassword?: boolean;
  errors?: FieldError;
  type?: TextInputMaskTypeProp;
  width?: string;
  height?: number;
  disabled?: boolean;
  rightIcon?: IIconList;
  isLoading?: boolean;
  onPressRight?: () => any;
}

export function InputMask({
  title,
  isActivePassword,
  type,
  width,
  height,
  errors,
  disabled,
  rightIcon,
  onPressRight,
  isLoading,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <S.Container width={width}>
      <S.ContainerHeader>
        <Text
          variant="Poppins_500Medium"
          color="LIGHT_BLUE"
          fontSize={14}
          style={{
            letterSpacing: 0.15,
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
      </S.ContainerHeader>

      <S.ContentInput width={width} height={height} isErrored={!!errors}>
        <S.TextInputNative
          placeholderTextColor={"#707686"}
          editable={disabled}
          type={type}
          selectTextOnFocus={disabled}
          placeholder="Digite"
          secureTextEntry={isActivePassword ? isOpen : false}
          {...props}
        />
        {rightIcon && (
          <S.ButtonEye onPress={onPressRight}>
            <Icon type={rightIcon} />
          </S.ButtonEye>
        )}
        {isActivePassword && (
          <S.ButtonEye onPress={() => setIsOpen((oldState) => !oldState)}>
            {isOpen ? <Icon type="closeEye" /> : <Icon type="openEye" />}
          </S.ButtonEye>
        )}

        {isLoading && (
          <ActivityIndicator
            size={26}
            style={{
              width: 52,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            color={theme.colors.BLUE}
          />
        )}
      </S.ContentInput>
      {errors && (
        <Text variant="Poppins_400Regular" fontSize={12} color="RED">
          {String(errors?.message)}
        </Text>
      )}
    </S.Container>
  );
}
