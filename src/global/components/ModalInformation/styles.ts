import { scale } from "react-native-size-matters";
import styled, { css } from "styled-components/native";

export const Container = styled.Modal`
  flex: 1;
`;

export const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Background = styled.View`
  width: 100%;
  min-height: ${scale(52)}px;

  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const bar = styled.View`
  height: ${scale(8)}px;
  width: ${scale(62)}px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.BLUE};
  opacity: 0.4;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0px 45px;
`;
