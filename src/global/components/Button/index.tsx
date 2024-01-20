import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import * as S from "./styles";
import Text from "../Text";

export type IButtonType = "primary" | "secondary";

interface Props extends TouchableOpacityProps {
  title: string;
  type?: IButtonType;
  activeLoad?: boolean;
  width?: number;
  isInactive?: boolean;
  opacity?: number;
  icon?: boolean;
}

export function Button({
  title,
  type = "primary",
  activeLoad,
  width,
  isInactive = false,
  opacity = 1,
  icon,
  ...rest
}: Props) {
  return (
    <S.Container
      disabled={isInactive ? true : activeLoad}
      type={type}
      width={width}
      opacity={opacity}
      {...rest}
    >
      {activeLoad ? (
        <ActivityIndicator color="#f2f2f2" size={40} />
      ) : (
        <Text
          variant="Poppins_500Medium"
          color={type === "primary" ? "WHITE" : "BLACK"}
          fontSize={18}
          textTransform="uppercase"
        >
          {title}
        </Text>
      )}
    </S.Container>
  );
}
