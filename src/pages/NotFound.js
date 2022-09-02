import { Link } from 'react-router-dom';

import Logo from '../components/Logo';
import { BorderContainer, ContainerSection } from '../stylesComponents/loginStyles';

const NotFound = () => {

  return (
    <ContainerSection>
      <BorderContainer className="d-flex flex-column" >
        <div className="p-4 mx-4 text-center">
          <Logo />
          <div>
            <h1 style={ {fontSize: '1rem'} }>
              Error 404. La página solicitada no existe
            </h1>
            <strong
              style={ {fontSize: '1rem', fontWeight: 'normal'} }>
              La página a la que intento navegar no existe dentro del sitio gestiocal.
            </strong>
          </div>
          <div className="mt-4">
            <Link className="btn btn-block btn-primary" to="/">
              Ir al inicio
            </Link>
          </div>
        </div>
      </BorderContainer>
    </ContainerSection>
  );
};

export default NotFound;