import { useState } from 'react';
import { Link } from 'react-router-dom';

import useLogin from '../hooks/useLogin';
import CustomizedInput from '../components/CustomizedInput';
import Logo from '../components/Logo';
import { notifyInfo } from '../consts/notify';
import '../styles/login.css';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useLogin();

  const handleLogin = (evt) => {
    evt.preventDefault();

    if (userName.trim() === '' || password.trim === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      setIsLoading(true);
      login({userName, password, setState: setIsLoading});
    }
  };

  return (
    <section
      className="section-form"
      style={ {height: '100vh'} }
    >
      <div className="d-flex flex-column form-container apply-border" >
        <form
          className="p-4 mx-4"
          onSubmit={ handleLogin }
        >
          <Logo />
          <div>
            <p>
              <strong>Inserta tus datos, y accede para gestionar tus calificaciones</strong>
            </p>
            <h1
              style={ {fontSize: '1rem', fontWeight: 'normal'} }>
              Controla tus calificaciones, de una manera personalizada y en la nube
            </h1>
          </div>
          <div className="d-flex flex-column mt-4 pt-1">
            <CustomizedInput
              type="text"
              placeholder="Usuario"
              state={ userName }
              setState={ setUserName }
              classNameIcon="bi bi-person-fill"
            />
            <CustomizedInput
              type="password"
              placeholder="Contraseña"
              state={ password }
              setState={ setPassword }
              classNameIcon="bi bi-lock-fill"
            />
          </div>
          <div>
            <button className="btn btn-primary mt-3 w-100" type="submit"
              disabled={ isLoading }
            >
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
              Iniciar ahora
            </button>
          </div>
          <div className="text-center pt-4" style={ {fontSize: '1rem', opacity: '0.7'} }>
            <p>Todavía no tienes cuenta? <span><Link to="/register"> Registrate aquí</Link></span></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;