import React, { useState } from "react";
import * as S from "./styles";
import { View, TouchableOpacity, Platform } from "react-native";

import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import Text from "../Text";

import { FieldError } from "react-hook-form";

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

  const toggleDatePicker = () => {
    if (props.editable) {
      setShowDatePicker((prevState) => !prevState);
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedDate(selectedDate);
      props.onChange(selectedDate);
    }
  };

  return (
    <View>
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
            value={props.value ? props.value.toISOString().split("T")[0] : ""}
          />
          <S.IconContainer>
            <S.CalendarIcon />
          </S.IconContainer>
        </S.ContentInput>
      </TouchableOpacity>

      {props.errors && (
        <Text variant="Poppins_400Regular" fontSize={12} color="RED">
          {String(props.errors.message)}
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
    </View>
  );
}
