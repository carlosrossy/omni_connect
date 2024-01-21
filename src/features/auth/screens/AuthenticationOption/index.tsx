import React from "react";
import * as S from "./styles";

import { StatusBar, useWindowDimensions } from "react-native";

import Text from "@global/components/Text";

import Connect from "@assets/connecting_teams.svg";
import { Button } from "@global/components/Button";
import { Spacer } from "@global/components/Spacer";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { useNavigation } from "@react-navigation/native";

export default function AuthenticationOption() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { width, height } = useWindowDimensions();

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

      <Connect height={height * 0.6} width={width * 0.85}/>

      <S.ButtonContainer>
        <Button
          title="CADASTRE-SE"
          onPress={() => navigation.navigate("SignUp")}
        />

        <Spacer height={16} />

        <Button
          title="FAZER LOGIN"
          type="secondary"
          onPress={() => navigation.navigate("SignIn")}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
