import styled from "styled-components";

export default styled.select`
  width: 100%;
  background: #FFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  height: 52px;
  border-radius: 4px;
  border: 2px solid #FFF;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.3s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
    opacity: 1;
  }
`
