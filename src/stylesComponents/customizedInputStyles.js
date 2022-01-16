import styled from 'styled-components';

export const IconSize = styled.i`
  opacity: 0.7;
  font-size: 1.25rem;
  padding-right: 5px;
`;
export const ContainerInputs = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px; 

  border: 1px solid rgba(9, 113, 163, 1);
  border-radius: 3px;
  outline: none;

  & input{
    width: 100%;
    font-size: 1rem;
    border: none;

    &:focus{
      outline: none;
    }
  }
`;