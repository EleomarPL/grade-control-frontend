import styled from 'styled-components';

export const SettingsContainer = styled.div`
  width: 70%;

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const ButtonDelete = styled.button`
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const SettingsContainerData = styled.div`
  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  background: white;

  @media only screen and (max-width: 600px) {
    border: none;
  }
`;