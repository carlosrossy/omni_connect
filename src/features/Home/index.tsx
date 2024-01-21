import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import Text from "@global/components/Text";
import { Button } from "@global/components/Button";
import { useAuth } from "@global/context/userAuth";
import { format } from "date-fns";
import { formatCPFInApp, getGenderLabel } from "@global/utils/verificator";

export default function Home() {
  const { logout, userCredentials } = useAuth();

  const formattedBirthDate = userCredentials?.birth_date
    ? format(new Date(userCredentials?.birth_date), "dd/MM/yyyy")
    : "Data de Nascimento não disponível";

  return (
    <S.Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Text variant="Poppins_700Bold" fontSize={20}>
        Bem-vindo, {userCredentials?.name}!
      </Text>

      <Text variant="Poppins_400Regular" fontSize={16}>
        Email: {userCredentials?.email}
      </Text>
      <Text variant="Poppins_400Regular" fontSize={16}>
        Telefone: {userCredentials?.phone}
      </Text>
      <Text variant="Poppins_400Regular" fontSize={16}>
        Data de Nascimento: {formattedBirthDate}
      </Text>
      <Text variant="Poppins_400Regular" fontSize={16}>
        CPF: {formatCPFInApp(userCredentials?.cpf!)}
      </Text>
      <Text variant="Poppins_400Regular" fontSize={16}>
        Sexo: {getGenderLabel(userCredentials?.sex!)}
      </Text>

      <S.ButtonContainer>
        <Button title="LogOUT" onPress={logout} />
      </S.ButtonContainer>
    </S.Container>
  );
}
