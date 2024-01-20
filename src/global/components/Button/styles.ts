import styled, { css } from "styled-components/native";
import { IButtonType } from ".";
import { scale } from "react-native-size-matters";

interface IType {
  type?: IButtonType;
  width?: number;
  opacity?: number;
}

const typePrimary = css`
  background-color: ${({ theme }) => theme.colors.BLUE};
`;

const typeSecondary = css`
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

export const Container = styled.TouchableOpacity<IType>`
  width: ${({ width }) => (width ? `${width}px` : `100%`)};
  height: ${scale(56)}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 8px 0;
  opacity: ${({ opacity }) => opacity}
    ${({ type }) => type === "primary" && typePrimary}
    ${({ type }) => type === "secondary" && typeSecondary}
`;
