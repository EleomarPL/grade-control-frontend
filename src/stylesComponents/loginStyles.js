import styled from 'styled-components';

export const BorderContainer = styled.div`
  background: white;
  width: 40%;

  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  @media only screen and (max-width: 900px) {
    width: 55%;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    border: 0;
  }
`;
export const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 700px) {
    justify-content: flex-start;
  }
`;