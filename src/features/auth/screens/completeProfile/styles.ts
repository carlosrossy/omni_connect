import styled from "styled-components/native";

interface Iprops {
  top?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const Header = styled.View<Iprops>`
  top: ${({ top }) => (top ? top + 10 : 0)};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 23px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0px 45px;
  margin-bottom: 30px;
`;

export const Form = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
