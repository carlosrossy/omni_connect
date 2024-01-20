import React, { useState } from "react";
import * as S from "./styles";
import { View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import Text from "../Text";

import { FieldError } from "react-hook-form";
import theme from "@global/styles/theme";

interface InputDateProps {
  value: Date;
  onChange: (date: Date) => void;
  errors?: FieldError;
  editable?: boolean;
}

export function InputDate(props: InputDateProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    props.value || new Date()
  );
  const [futureDateError, setFutureDateError] = useState<string | null>(null);

  const toggleDatePicker = () => {
    if (props.editable) {
      setShowDatePicker((prevState) => !prevState);
      setFutureDateError(null);
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(Platform.OS === "ios");

    if (selectedDate) {
      if (isFutureDate(selectedDate)) {
        setFutureDateError("A data não pode ser no futuro");
      } else {
        setSelectedDate(selectedDate);
        props.onChange(selectedDate);
        setFutureDateError(null);
      }
    }
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    return date > today;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formattedDate =
    selectedDate instanceof Date
      ? isToday(selectedDate)
        ? ""
        : selectedDate.toLocaleDateString("pt-BR")
      : "";

  return (
    <S.Container>
      <S.ContainerHeader>
        <Text
          variant="Poppins_500Medium"
          color="LIGHT_BLUE"
          fontSize={16}
          style={{
            letterSpacing: 0.15,
            marginBottom: 5,
          }}
        >
          Data de nascimento
        </Text>
      </S.ContainerHeader>

      <TouchableOpacity onPress={toggleDatePicker} disabled={!props.editable}>
        <S.ContentInput isErrored={!!props.errors}>
          <S.TextInputNative
            placeholder="Data de Nascimento"
            editable={false}
            placeholderTextColor="#707686"
            value={formattedDate}
          />
          <S.IconContainer>
            <Ionicons
              name="calendar"
              size={22}
              color={theme.colors.GRAY_DARK}
            />
          </S.IconContainer>
        </S.ContentInput>
      </TouchableOpacity>

      {props.errors && (
        <Text variant="Poppins_400Regular" fontSize={12} color="RED">
          {String(props.errors?.message || futureDateError)}
        </Text>
      )}

      {showDatePicker && props.editable && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </S.Container>
  );
}
