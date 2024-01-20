import React, { useState } from "react";
import * as S from "./styles";

import { StatusBar, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Text from "@global/components/Text";
import { ISignInCredentials, ISignUpData } from "@features/auth/models/auth";
import { Spacer } from "@global/components/Spacer";
import { Button } from "@global/components/Button";
import { Input } from "@global/components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { Header } from "@global/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalInformation from "@global/components/ModalInformation";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { singUp } from "@features/auth/services/SingUp";
import { useAuth } from "@global/context/userAuth";
import { showUser } from "@features/auth/services/showUser";

const formSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("O campo deve conter um e-mail válido")
    .required("E-mail é um campo obrigatório"),
  emailConfirmation: yup
    .string()
    .oneOf([yup.ref("email"), undefined], "Os e-mails devem ser iguais")
    .required("Confirmação de e-mail é obrigatória"),
  password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres")
    .required("Senha é um campo obrigatório"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function SignUp() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setToken, setUserCredentials } = useAuth();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpData>({ resolver: yupResolver(formSchema) });

  function handleCloseModal() {
    setOpenModal(false);
  }

  function HandleOpenModal() {
    setOpenModal(true);
  }

  function handleCompleteProfile() {
    handleCloseModal();
    navigation.navigate("CompleteProfile");
  }

  async function handleSuccess(data: any) {
    setToken(data);
    try {
      const userData = await showUser({token: data});

      setUserCredentials(userData);

      HandleOpenModal();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const { mutate, isLoading } = useMutation(
    (data: ISignUpData) =>
      singUp({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }),
    {
      onSuccess: (data: any) => {
        handleSuccess(data.token.token);
      },
      onError: (error: AxiosError) => {
        if (error.response) {
          const dataError = error?.response?.data?.errors[0];

          console.log(dataError.message);

          if (error.response?.status! >= 500) {
            Toast.show({
              type: "error",
              text1: "Erro de servidor",
              text2: "Tente novamente!",
            });
          } else {
            if (dataError.message === "Já existe um usuário com este email") {
              Toast.show({
                type: "error",
                text1: "Email",
                text2: "Já existe um usuário com este email",
              });
            }
            if (dataError.message === "As senhas devem ser iguais") {
              Toast.show({
                type: "error",
                text1: "Senhas",
                text2: "As senhas devem ser iguais",
              });
            }
          }
        }
      },
    }
  );

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#FDFDFD" }}
      showsVerticalScrollIndicator={false}
    >
      <S.Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <Header
          title="CADASTRO"
          top={StatusBar.currentHeight! + 16}
          onPressLeft={navigation.goBack}
        />

        <Spacer height={80} />

        <S.Form>
          <Controller
            control={control}
            name="name"
            rules={{ required: "name é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Nome"
                placeholder="Nome"
                errors={errors?.name}
              />
            )}
          />

          <Spacer height={12} />

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
            name="emailConfirmation"
            rules={{ required: "emailConfirmation é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Confirmar E-mail"
                placeholder="Confirmar E-mail"
                keyboardType="email-address"
                autoCapitalize={"none"}
                errors={errors?.emailConfirmation}
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

          <Spacer height={12} />

          <Controller
            control={control}
            name="passwordConfirmation"
            rules={{ required: "passwordConfirmation é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                title="Confirmar Senha"
                value={value}
                isActivePassword
                placeholder="Confirmar Senha"
                autoCapitalize={"none"}
                errors={errors?.passwordConfirmation}
              />
            )}
          />
        </S.Form>

        <Spacer height={40} />

        <S.ButtonContainer>
          <Button
            title="CADASTRAR"
            onPress={handleSubmit((data) => {
              mutate(data);
            })}
            activeLoad={isLoading}
          />
        </S.ButtonContainer>

        <ModalInformation
          onClose={handleCloseModal}
          visible={openModal}
          fontSizeTitle={22}
          title="Cadastro feito com sucesso!"
          fontSizeDescription={16}
          description="Agora finalize o seu perfil para ter accesso aos dados"
          buttonText="CONCLUIR"
          onPress={handleCompleteProfile}
          type="RegistrationCompleted"
        />
      </S.Container>
    </KeyboardAwareScrollView>
  );
}
