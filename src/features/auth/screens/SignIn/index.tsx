import React from "react";
import * as S from "./styles";

import { StatusBar } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ISignInCredentials } from "@features/auth/models/auth";
import { Spacer } from "@global/components/Spacer";
import { Button } from "@global/components/Button";
import { Input } from "@global/components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { Header } from "@global/components/Header";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { singIn } from "@features/auth/services/SingIn";
import { useMutation } from "@tanstack/react-query";

const formSchema = yup.object({
  email: yup
    .string()
    .email(`O campo deve conter um e-mail válido`)
    .required(`E-mail é um campo obrigatório`),
  password: yup
    .string()
    .min(6, (v) => `A senha deve conter no mínimo ${v.min} caracteres`)
    .required(`Senha é um campo obrigatório`),
});

export default function SignIn() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  // const onSubmit = (data: ISignInCredentials) => {
  //   console.log("Form data submitted:", data);
  // };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignInCredentials>({ resolver: yupResolver(formSchema) });

  const { mutate, isLoading } = useMutation(
    (data: ISignInCredentials) =>
      singIn({
        email: data.email,
        password: data.password,
      }),
    {
      onSuccess: (data: ISignInCredentials) => {
        console.log(data);
      },
      onError: (error: AxiosError) => {
        if (error.response) {
          const dataError = error?.response?.data?.errors[0]

          console.log(dataError.errors)

          if (error.response?.status! >= 500) {
            Toast.show({
              type: "error",
              text1: "Erro de servidor",
              text2: "Tente novamente!",
            });
          } else {
            if (
              dataError.message === "Usuário não cadastrado no sistema"
            ) {
              Toast.show({
                type: "error",
                text1: "Email",
                text2: "Usuário não cadastrado no sistema",
              });
            }
            if (
              dataError.message ===
                "E_INVALID_AUTH_PASSWORD: Password mis-match"
            ) {
              Toast.show({
                type: "error",
                text1: "Senha",
                text2: "Senha incorreta",
              });
            }
          }
        }
      },
    }
  );

  return (
    <S.Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header
        title="LOGIN"
        top={StatusBar.currentHeight! + 16}
        onPressLeft={navigation.goBack}
      />

      <Spacer height={80} />

      <S.Form>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email é obrigatório" }}
          render={({ field: { value, onChange } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              title="E-mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize={"none"}
              errors={errors?.email}
            />
          )}
        />

        <Spacer height={12} />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatório" }}
          render={({ field: { value, onChange } }) => (
            <Input
              onChangeText={onChange}
              title="Senha"
              value={value}
              isActivePassword
              placeholder="Senha"
              autoCapitalize={"none"}
              errors={errors?.password}
            />
          )}
        />
      </S.Form>

      <Spacer height={80} />

      <S.ButtonContainer>
        <Button
          title="ENTRAR"
          onPress={handleSubmit((data) => {
            mutate(data);
          })}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
