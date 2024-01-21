import styled from "styled-components/native";

interface Iprops {
  top?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0px 45px;
  margin-bottom: 30px;
`;


export const Info = styled.View<Iprops>`
  top: ${({ top }) => (top ? top + 10 : 0)};
  padding: 0 24px;
`;

