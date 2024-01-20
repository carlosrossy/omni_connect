import React from "react";
import * as S from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

import Text from "../Text";

interface Props {
  title?: string;
  onPressLeft?: () => void;
  top?: number;
}

export function Header({ title, onPressLeft, top }: Props) {
  return (
    <S.Container top={top}>
      <S.Row>
        <S.LeftButton onPress={onPressLeft}>
          <MaterialIcons name="arrow-back-ios" size={26} color="#5583A4" />
        </S.LeftButton>

        <Text
          variant="Poppins_500Medium"
          fontSize={20}
          color={"LIGHT_BLUE"}
          textAlign="center"
          style={{
            position: "absolute",
            right: 0,
            left: 35,
            width: "80%",
          }}
        >
          {title}
        </Text>
      </S.Row>
    </S.Container>
  );
}
