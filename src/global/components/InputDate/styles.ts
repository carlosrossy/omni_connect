import { PixelRatio } from "react-native";
import styled, { css } from "styled-components/native";
import { horizontalScale } from "../../../../../../global/utils/scale";
import { Ionicons } from "@expo/vector-icons";

interface IContainerProps {
  isErrored?: boolean;
  width?: string;
  height?: number;
}

const fontScale = PixelRatio.getFontScale();

export const Container = styled.View<IContainerProps>`
  width: ${({ width }) => (width ? width : `100%`)};
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentInput = styled.View<IContainerProps>`
  width: ${({ width }) => (width ? width : `100%`)};
  height: ${({ height }) =>
    height ? `${fontScale * height}px` : `${fontScale * 60}px`};
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border: 1.2px solid ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: 8px;
  ${(props) =>
    props.isErrored &&
    css`
      border: 1.2px solid;
      border-color: ${({ theme }) => theme.colors.RED};
    `}
`;

export const TextInputNative = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.GRAY_DARK};
  font-size: 16px;
  margin-left: 20px;
`;

export const IconContainer = styled.View<{ isErrored?: boolean }>`
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isErrored &&
    css`
      color: ${({ theme }) => theme.colors.RED};
    `}
`;

export const CalendarIcon = styled(Ionicons).attrs(({ theme }) => ({
  name: "ios-calendar",
  size: fontScale * 20,
  color: theme.colors.GRAY_DARK,
}))``;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.RED};
  font-size: 14px;
  margin-top: 5px;
`;
