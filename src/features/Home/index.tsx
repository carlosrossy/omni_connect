import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import Text from "@global/components/Text";

export default function Home() {
  return (
    <S.Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Text variant="Poppins_700Bold" fontSize={20}>
        ENTROU
      </Text>
    </S.Container>
  );
}
