import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import Text from "@global/components/Text";
import { Button } from "@global/components/Button";
import { useAuth } from "@global/context/userAuth";

export default function Home() {
  const {logout} = useAuth();

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

      <Button title="LogOUT" onPress={logout}/>
    </S.Container>
  );
}
