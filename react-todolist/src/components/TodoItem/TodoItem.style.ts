import styled from 'styled-components';

export const StyledTodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const CustomRadio = styled.span<{
  $completed?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  border: 1px rgb(108, 108, 108) solid;
  border-radius: 2rem;
  cursor: pointer;
  color: var(--bg-color);

  ${(props) =>
    props.$completed
      ? `border-color: rgb(226, 184, 13);
         background-color: rgb(226, 184, 13);`
      : ''};
`;

export const EdittingInput = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
`;
