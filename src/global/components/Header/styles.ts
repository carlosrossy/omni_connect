import styled from "styled-components/native";

interface Iprops {
  top?: number;
}

export const Container = styled.View<Iprops>`
  top: ${({ top }) => (top ? top : 0)};
  padding: 0px 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LeftButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
