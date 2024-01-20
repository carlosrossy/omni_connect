import styled, { css } from "styled-components/native";

interface IContainerProps {
  isErrored?: boolean;
}

export const GenreSelectButton = styled.TouchableOpacity<IContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 10px;
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: 10px;
  width: 100%;
  ${(props) =>
    props.isErrored &&
    css`
      border: 1.2px solid;
      border-color: ${({ theme }) => theme.colors.RED};
    `}
`;
