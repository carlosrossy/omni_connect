import styled from "styled-components/native";

interface Iprops {
  top?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.View<Iprops>`
  top: ${({ top }) => (top ? top + 10 : 0)};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0px 45px;
  margin-bottom: 30px;
`;