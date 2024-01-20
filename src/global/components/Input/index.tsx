import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Icon } from "../Icon";
import Text from "../Text";
import * as S from "./styles";
import { IIconList } from "@global/styles/icons";

interface Props extends TextInputProps {
  title?: string;
  isActivePassword?: boolean;
  errors?: FieldError;
  type?: IIconList;
  width?: string;
  height?: number;
  disabled?: boolean;
  rightIcon?: IIconList;
  onPressRight?: () => any;
}

export function Input({
  title,
  isActivePassword,
  type,
  width,
  height,
  errors,
  disabled,
  rightIcon,
  onPressRight,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <S.Container width={width}>
      <S.ContainerHeader>
        <Text
          variant="Poppins_500Medium"
          color="LIGHT_BLUE"
          fontSize={16}
          style={{
            letterSpacing: 0.15,
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
      </S.ContainerHeader>

      <S.ContentInput width={width} height={height} isErrored={!!errors}>
        <S.Icon isErrored={!!errors}>
          {type && <Icon type={type} color={"GRAY"}></Icon>}
        </S.Icon>

        <S.TextInputNative
          placeholderTextColor={"#707686"}
          editable={disabled}
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
      </S.ContentInput>
      {errors && (
        <Text variant="Poppins_400Regular" fontSize={12} color="RED">
          {String(errors?.message)}
        </Text>
      )}
    </S.Container>
  );
}
