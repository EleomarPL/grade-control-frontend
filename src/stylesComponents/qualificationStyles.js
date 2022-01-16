import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ContainerHome = styled.div`
  padding: 0;
  margin: 0;
`;
export const StylesNavLink = styled(NavLink)`
  border: none;
  opacity: 0.5;
  color: black;
  width: 20%;
  padding: 10px 10px;

  text-decoration: none;
  font-size: 1.1rem;
  text-align: center;
  &.active {
    opacity: 1;
    border: solid 1px gray;
    border-radius: 10px;
  }

  @media only screen and (max-width: 700px) {
    width: 40%;
  }
`;
export const DivAddNewQualification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  overflow: hidden;
  font-size: 3rem;

  transition: all .5s;

  & button{
    background: transparent;
    border: none;
  }
  &:hover{
    transform: scale(1.2);
  }

  @media only screen and (max-width: 700px) {
    font-size: 2.5rem;
  }
`;