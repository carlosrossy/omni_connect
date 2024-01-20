import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import Text from "@global/components/Text";

import Connect from "@assets/connecting_teams.svg";
import { Button } from "@global/components/Button";
import { Spacer } from "@global/components/Spacer";

export default function AuthenticationOption() {
  return (
    <S.Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <S.Header top={StatusBar.currentHeight}>
        <Text
          variant="Poppins_600SemiBold"
          textAlign="center"
          color="LIGHT_BLUE"
          fontSize={20}
        >{`Conecte-se\nsem dificuldades`}</Text>
      </S.Header>

      <Connect />

      <S.ButtonContainer>
        <Button title="CADASTRE-SE" />

        <Spacer height={16} />

        <Button title="FAZER LOGIN" type="secondary" />
      </S.ButtonContainer>
    </S.Container>
  );
}
