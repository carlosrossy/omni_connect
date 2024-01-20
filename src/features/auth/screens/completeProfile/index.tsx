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
import {
  formatBirthDate,
  formatCPF,
  removeSpecialCharacters,
} from "@global/utils/verificator";
import ViaCep from "@global/services/cep";
import Toast from "react-native-toast-message";
import GenderPicker, { DropdownOption } from "@global/components/Select";
import { useAuth } from "@global/context/userAuth";
import { AxiosError } from "axios";
import { completeProfile } from "@features/auth/services/CompleteProfile";
import { useMutation } from "@tanstack/react-query";
import { showUser } from "@features/auth/services/showUser";

const formSchema = yup.object({
  cpf: yup.string().required("CPF é obrigatório"),
  sex: yup.string().required("Gênero é obrigatório"),
  birthDate: yup.date().required("Data de Nascimento é obrigatória"),
  phone: yup.string().required("Telefone é obrigatório"),
  postalCode: yup.string().required("CEP é obrigatório"),
  uf: yup.string().required("Estado é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  adress: yup.string().required("Rua é obrigatória"),
  adressNumber: yup.string().required("Número é obrigatório"),
  complement: yup.string().required("Complemento é obrigatório"),
});

export default function CompleteProfile() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [cepIsLoading, setCepIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<DropdownOption | null>(
    null
  );
  const { token, userCredentials } = useAuth();

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
    navigation.navigate("SignIn");
  }

  const handleSelectedGender = (selectedGender: DropdownOption | null) => {
    setSelectedGender(selectedGender);
    console.log("Gênero selecionado:", selectedGender);
  };

  const [cepValue, setCepValue] = useState("");

  async function searchAddress(value: string) {
    try {
      const cep = removeSpecialCharacters(value);

      setCepIsLoading(true);

      if (cep.length === 8) {
        const response = await ViaCep.searchCep(cep);
        console.warn("Cep", response.data);

        if (response.data.erro) {
          setValue("uf", "");
          setValue("city", "");
          setValue("adress", "");
          setValue("complement", "");
          setValue("neighborhood", "");

          Toast.show({
            type: "error",
            text1: "CEP inválido",
            text2: "O CEP informado não é válido",
          });

          setCepIsLoading(false);
        } else {
          setValue("uf", response.data.uf);
          setValue("city", response.data.localidade);
          setValue("adress", response.data.logradouro);
          setValue("complement", response.data.complemento!);
          setValue("neighborhood", response.data.bairro);
          setValue("adressNumber", "");

          setCepIsLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error", error);
    }
  }

  const { mutate, isLoading } = useMutation(
    (data: ICompleteProfileData) =>
      completeProfile({
        userID: userCredentials?.id!,
        token: token!,
        cpf: formatCPF(data.cpf),
        sex: selectedGender?.value!,
        birthDate: formatBirthDate(data.birthDate),
        phone: data.phone,
        postalCode: data.postalCode,
        adress: data.adress,
        adressNumber: data.adressNumber,
        complement: data.complement,
        neighborhood: data.neighborhood,
        uf: data.uf,
        city: data.city,
      }),
    {
      onSuccess: (data: any) => {
        console.log(data);
        HandleOpenModal();
      },
      onError: (error: AxiosError) => {
        if (error.response) {
          const dataError = error?.response?.data?.errors[0];

          console.log(dataError);

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
          }
        }
      },
    }
  );

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <S.Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <Header
          title="COMPLETAR CADASTRO"
          top={StatusBar.currentHeight! + 16}
          // onPressLeft={navigation.goBack}
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
            name="sex"
            render={({ field: { value, onChange } }) => (
              <GenderPicker
                onSelectGender={(selectedGender: any) =>
                  handleSelectedGender(selectedGender)
                }
                onChange={onChange}
                errors={errors?.sex}
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
            name="postalCode"
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
                errors={errors?.postalCode}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="uf"
            rules={{ required: "Estado é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Estado"
                placeholder="Estado"
                errors={errors?.uf}
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
            name="adress"
            rules={{ required: "Rua é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Rua"
                placeholder="Rua"
                errors={errors?.adress}
              />
            )}
          />

          <Spacer height={16} />

          <Controller
            control={control}
            name="adressNumber"
            rules={{ required: "Numero é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Número"
                placeholder="Número"
                errors={errors?.adressNumber}
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
