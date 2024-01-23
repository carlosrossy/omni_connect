import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import Text from "@global/components/Text";
import { Button } from "@global/components/Button";
import { useAuth } from "@global/context/userAuth";
import { format, parseISO } from "date-fns";
import {
  formatCPFInApp,
  formatDateString,
  formatName,
  getGenderLabel,
} from "@global/utils/verificator";
import { Spacer } from "@global/components/Spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home() {
  const { logout, userCredentials } = useAuth();

  const birthDateString = userCredentials?.birth_date;
  const formattedBirthDate = birthDateString
    ? formatDateString(birthDateString)
    : "Data de Nascimento não disponível";

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <S.Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <S.Info top={StatusBar.currentHeight}>
          <Text
            variant="Poppins_700Bold"
            fontSize={20}
            color="LIGHT_BLUE"
            textAlign="center"
          >
            Bem-vindo, {formatName(userCredentials?.name!)}!
          </Text>

          <Spacer height={30} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Email:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.email}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Telefone:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.phone}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Data de Nascimento:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {formattedBirthDate}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            CPF:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {formatCPFInApp(userCredentials?.cpf!)}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Sexo:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {getGenderLabel(userCredentials?.sex!)}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Endereço:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.adress?.adress}{" "}
            {userCredentials?.adress?.adress_number}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Complemento:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.adress?.complement}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Bairro:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.adress?.neighborhood}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            Cidade:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.adress?.city} - {userCredentials?.adress?.uf}
          </Text>

          <Spacer height={8} />

          <Text variant="Poppins_600SemiBold" color="LIGHT_BLUE" fontSize={16}>
            CEP:
          </Text>
          <Text variant="Poppins_400Regular" fontSize={16}>
            {userCredentials?.adress?.postal_code}
          </Text>

          <Spacer height={20} />

          <S.ButtonContainer>
            <Button title="LogOUT" onPress={logout} />
          </S.ButtonContainer>

          <Spacer height={40} />
        </S.Info>
      </S.Container>
    </KeyboardAwareScrollView>
  );
}
