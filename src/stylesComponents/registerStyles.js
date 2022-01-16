import styled from 'styled-components';

export const FormContainer = styled.form`
  padding-left: 1rem;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }

  & input, & textarea{
    border: 1.5px solid rgba(9, 113, 163, 1);
    border-radius: 10px;
    outline: none;
    padding-left: 1rem;
    width: 50%;

    @media only screen and (max-width: 900px) {
      width: 70%;
    }
    @media only screen and (max-width: 700px) {
      width: 80%;
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;
export const ContainerRegister = styled.div`
  width: 70%;
  @media only screen and (max-width: 900px) {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const ContainerRegisterData = styled.div`
  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  background: white;

  @media only screen and (max-width: 600px) {
    border: none;
  }
`;
export const ButtonSave = styled.button`
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const Indication = styled.div`
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;