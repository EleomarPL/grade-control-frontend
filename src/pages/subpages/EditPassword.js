import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomizedInput from '../../components/CustomizedInput';
import { notifyInfo } from '../../consts/notify';
import ButtonBack from '../../components/ButtonBack';
import useUser from '../../hooks/useUser';

import { BorderContainer, ContainerSection } from '../../stylesComponents/loginStyles';

const EditPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { updatePasswordUser } = useUser();
  const navigate = useNavigate();

  const handleUpdatePassword = (evt) => {
    evt.preventDefault();
    if (oldPassword.trim() === '' || newPassword.trim() === '' ||
      confirmNewPassword.trim() === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      if ( newPassword.length < 6 || newPassword.length > 40 ||
        (confirmNewPassword.length < 6 || confirmNewPassword.length > 40) ) {
        notifyInfo('La contraseña debe ser mayor a 5 y menor que 40');
      } else if (newPassword !== confirmNewPassword)
        notifyInfo('Las contraseñas no coinciden');
      else {
        setIsLoading(true);
        updatePasswordUser({newPassword, oldPassword}).then(res => {
          setIsLoading(false);
          if (res) navigate(-1);
        });
      }
    }
  };
  return (
    <ContainerSection
      style={ {height: '90vh'} }
    >
      <BorderContainer className="d-flex flex-column" >
        <ButtonBack />
        <form
          className="px-4 pb-4 pt-1 mx-4"
          onSubmit={ handleUpdatePassword }
        >
          <div>
            <p>
              <strong>Actualiza tu contraseña</strong>
            </p>
          </div>
          <div className="d-flex flex-column mt-4 pt-1">
            <CustomizedInput
              type="password"
              placeholder="Contraseña antigua"
              state={ oldPassword }
              setState={ setOldPassword }
              classNameIcon="bi bi-key-fill"
            />
            <CustomizedInput
              type="password"
              placeholder="Nueva contraseña"
              state={ newPassword }
              setState={ setNewPassword }
              classNameIcon="bi bi-lock"
            />
            <CustomizedInput
              type="password"
              placeholder="Nueva contraseña"
              state={ confirmNewPassword }
              setState={ setConfirmNewPassword }
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
              Actualizar
            </button>
          </div>
        </form>
      </BorderContainer>
    </ContainerSection>
  );
};

export default EditPassword;