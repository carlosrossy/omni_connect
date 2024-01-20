import styled from "styled-components/native";

interface Iprops {
  top?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
  align-items: center;
  justify-content: center;
`;