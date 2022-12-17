import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Text } from '@nextui-org/react';

import CustomizedInput from '../../components/CustomizedInput';
import { notifyInfo } from '../../consts/notify';
import ButtonBack from '../../components/ButtonBack';
import useUser from '../../hooks/useUser';
import SpinnerLoadingButton from '../../components/common/SpinnerLoadingButton';

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
      <BorderContainer>
        <ButtonBack />
        <Text h2 size="$xl">Actualiza tu contraseña</Text>
        <form onSubmit={ handleUpdatePassword }>
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
          <Button shadow color="primary"
            type="submit"
            disabled={ isLoading }
            css={ { px: '$13' } }
            auto style={ { width: '100%' } }
          >
            { isLoading && <SpinnerLoadingButton /> }
            Actualizar
          </Button>
        </form>
      </BorderContainer>
    </ContainerSection>
  );
};

const BorderContainer = styled.div`
  background: #F8F9FA;
  width: 40%;
  padding: 10px;

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
const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #EDEDE9;
`;

export default EditPassword;