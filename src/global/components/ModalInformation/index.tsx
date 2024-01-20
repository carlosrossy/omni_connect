import React from "react";
import { ModalProps, TouchableWithoutFeedback } from "react-native";
import * as S from "./styles";

import { Button } from "../Button";
import { Spacer } from "../Spacer";
import Text from "../Text";

import Profile from "@assets/icons/Profile.svg";

const SvgType = {
  RegistrationCompleted: { component: Profile, width: 73, height: 73 },
};

type Props = ModalProps & {
  visible: boolean;
  type?: "RegistrationCompleted";
  onClose?: () => void;
  title: string;
  description?: string;
  buttonText: string;
  buttonTextsecundary?: string;
  buttonTextTertiary?: string;
  onPress: () => void;
  loading?: boolean;
  onPressSecundary?: () => void;
  onPressTertiary?: () => void;
  fontSizeTitle?: number;
  fontSizeDescription?: number;
};

export default function ModalInformation({
  visible,
  onClose,
  type,
  title,
  description,
  buttonText,
  buttonTextsecundary,
  buttonTextTertiary,
  fontSizeTitle,
  fontSizeDescription,
  onPress,
  onPressSecundary,
  onPressTertiary,
  loading,
  ...rest
}: Props) {
  const { component: SvgComponent, width, height } = SvgType[type!];

  if (!visible) {
    return null;
  }

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <S.Container
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
      visible={visible}
    >
      <S.Main>
        <TouchableWithoutFeedback onPress={closeModal}>
          <S.Background>
            <S.bar />

            <Spacer height={25} />

            <SvgComponent width={width} height={height} />

            <Spacer height={15} />

            <Text
              variant="Poppins_400Regular"
              fontSize={fontSizeTitle}
              color="GRAY_TEXT"
              textAlign="center"
            >
              {title}
            </Text>

            <Spacer height={10} />

            <Text
              variant="Poppins_400Regular"
              fontSize={fontSizeDescription}
              color="GRAY_TEXT"
              textAlign="center"
            >
              {description}
            </Text>

            <Spacer height={24} />

            <S.ButtonContainer>
              <Button
                title={buttonText}
                type="primary"
                onPress={onPress}
                activeLoad={loading}
              />
            </S.ButtonContainer>
          </S.Background>
        </TouchableWithoutFeedback>
      </S.Main>
    </S.Container>
  );
}
