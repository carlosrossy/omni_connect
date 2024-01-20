import React, { useState } from "react";
import * as S from "./styles";

import { StatusBar, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { ICompleteProfileData } from "@features/auth/models/auth";
import { Spacer } from "@global/components/Spacer";
import { Button } from "@global/components/Button";
import { Input } from "@global/components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { Header } from "@global/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalInformation from "@global/components/ModalInformation";
import { InputMask } from "@global/components/InputMask";
import { InputDate } from "@global/components/InputDate";
import { removeSpecialCharacters } from "@global/utils/verificator";
import ViaCep from "@global/services/cep";
import Toast from "react-native-toast-message";

const formSchema = yup.object({
  cpf: yup.string().required("CPF é obrigatório"),
  birthDate: yup.date().required("Data de Nascimento é obrigatória"),
  phone: yup.string().required("Telefone é obrigatório"),
  cep: yup.string().required("CEP é obrigatório"),
  state: yup.string().required("Estado é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  street: yup.string().required("Rua é obrigatória"),
  number: yup.string().required("Número é obrigatório"),
  complement: yup.string().required("Complemento é obrigatório"),
});

export default function CompleteProfile() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [cepIsLoading, setCepIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<ICompleteProfileData>({ resolver: yupResolver(formSchema) });

  function handleCloseModal() {
    setOpenModal(false);
  }

  function HandleOpenModal() {
    setOpenModal(true);
  }

  function handleSingIn() {
    handleCloseModal();
  }

  const [cepValue, setCepValue] = useState("");

  async function searchAddress(value: string) {
    try {
      const cep = removeSpecialCharacters(value);

      setCepIsLoading(true);

      if (cep.length === 8) {
        const response = await ViaCep.searchCep(cep);
        console.warn("Cep", response.data);

        if (response.data.erro) {
          setValue("state", "");
          setValue("city", "");
          setValue("street", "");
          setValue("complement", "");
          setValue("neighborhood", "");

          Toast.show({
            type: "error",
            text1: "CEP inválido",
            text2: "O CEP informado não é válido",
          });

          setCepIsLoading(false);
        } else {
          setValue("state", response.data.uf);
          setValue("city", response.data.localidade);
          setValue("street", response.data.logradouro);
          setValue("complement", response.data.complemento!);
          setValue("neighborhood", response.data.bairro);
          setValue("number", "");

          setCepIsLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error", error);
    }
  }

  const onSubmit = (data: ICompleteProfileData) => {
    console.log("Form data submitted:", data);
    HandleOpenModal();
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
            name="cpf"
            rules={{ required: "CPF é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <InputMask
                onChangeText={onChange}
                type={"cpf"}
                value={value}
                title="CPF"
                placeholder="CPF"
                keyboardType="numeric"
                errors={errors?.cpf}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="birthDate"
            rules={{ required: "Data de Nascimento é obrigatória" }}
            render={({ field: { value, onChange } }) => (
              <InputDate
                value={value || date}
                onChange={onChange}
                errors={errors?.birthDate}
                editable={true}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="phone"
            rules={{ required: "telefone é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <InputMask
                onChangeText={onChange}
                title="Telefone"
                type="cel-phone"
                placeholder="Telefone"
                value={value!}
                errors={errors?.phone}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="cep"
            rules={{ required: "CEP é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <InputMask
                type="zip-code"
                value={cepValue}
                title="CEP"
                placeholder="CEP"
                onChangeText={(rawText) => {
                  setCepValue(rawText);
                  searchAddress(rawText);
                  onChange(rawText);
                }}
                isLoading={cepIsLoading}
                errors={errors?.cep}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="state"
            rules={{ required: "Estado é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Estado"
                placeholder="Estado"
                errors={errors?.state}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="city"
            rules={{ required: "Cidade é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Cidade"
                placeholder="Cidade"
                errors={errors?.city}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="neighborhood"
            rules={{ required: "Bairro é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Bairro"
                placeholder="Bairro"
                errors={errors?.neighborhood}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="street"
            rules={{ required: "Rua é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Rua"
                placeholder="Rua"
                errors={errors?.street}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="number"
            rules={{ required: "Numero é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Número"
                placeholder="Número"
                errors={errors?.number}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="complement"
            rules={{ required: "Complemento é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value!}
                title="Complemento"
                placeholder="Complemento"
                errors={errors?.complement}
              />
            )}
          />
        </S.Form>

        <Spacer height={40} />

        <S.ButtonContainer>
          <Button title="CADASTRAR" onPress={handleSubmit(onSubmit)} />
        </S.ButtonContainer>

        <ModalInformation
          onClose={handleCloseModal}
          visible={openModal}
          fontSizeTitle={20}
          title="Seu perfil foi finalizado com sucesso!"
          buttonText="OK"
          onPress={handleSingIn}
          type="RegistrationCompleted"
        />
      </S.Container>
    </KeyboardAwareScrollView>
  );
}
