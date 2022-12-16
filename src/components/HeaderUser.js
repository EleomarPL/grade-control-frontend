import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import OptionsUser from './OptionsUser';

const HeaderUser = () => {
  return (
    <NavbarUser className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center sticky-top">
      <Link to="/" style={ {color: 'black', textDecoration: 'none'} }>
        <Logo />
      </Link>
      <OptionsUser />
    </NavbarUser>
  );
};

const NavbarUser = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  background: rgb(48, 108, 197);
`;

export default HeaderUser;