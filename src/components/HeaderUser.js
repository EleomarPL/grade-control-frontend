import { Link } from 'react-router-dom';

import Logo from './Logo';
import OptionsUser from './OptionsUser';
import { NavbarUser } from '../stylesComponents/headerStyles';


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

export default HeaderUser;