import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../../components/ButtonBack';
import { dataUser } from '../../consts/user';
import { notifyInfo } from '../../consts/notify';
import { validationRegisterUser } from '../../services/validations/validationUser';
import useUser from '../../hooks/useUser';

import {
  ButtonSave, ContainerRegister,
  ContainerRegisterData, FormContainer, Indication
} from '../../stylesComponents/registerStyles';

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { getDataUser, updateDataUser } = useUser();

  useEffect(() => {
    getDataUser().then(res => {
      if (res) {
        let form = document.getElementById('form-data-user');
        form[0].value = res.name;
        form[1].value = res.lastName;
        form[2].value = res.motherLastName;
        form[3].value = res.phone;
        form[4].value = res.email;
        form[5].value = res.userName;
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleChangeData = (evt ) => {
    evt.preventDefault();

    let dataUser = {
      name: evt.target[0].value.trim(),
      lastName: evt.target[1].value.trim(),
      motherLastName: evt.target[2].value.trim(),
      phone: evt.target[3].value.trim(),
      email: evt.target[4].value.trim(),
      userName: evt.target[5].value.trim(),
      password: evt.target[6].value.trim()
    };
    if (!(dataUser.name && dataUser.lastName &&
      dataUser.motherLastName && dataUser.phone &&
      dataUser.email && dataUser.userName
    )) {
      notifyInfo('Rellene todos los campos');
    } else {
      let isCorrectData = validationRegisterUser(dataUser, true);
      if (isCorrectData) {
        setIsLoading(true);

        updateDataUser({
          name: dataUser.name, lastName: dataUser.lastName,
          motherLastName: dataUser.motherLastName,
          phone: dataUser.phone, email: dataUser.email,
          password: dataUser.password, userName: dataUser.userName
        }).then(res => {
          setIsLoading(false);
          if (res) navigate(-1);
        });
      }
    }
  };
  return (
    <section>
      <ContainerRegister className="register-container m-auto py-3">
        <ButtonBack />
        <ContainerRegisterData className="container-register-data px-4 pt-2">
          <Indication className="indications">
            <strong style={ {fontSize: '1.8rem'} }>Editar mis datos</strong>
            <p className="pt-1">Hola, para editar, solo basta con cambiar lo necesario</p>
          </Indication>
          <FormContainer className="pt-2" onSubmit={ (evt) => handleChangeData(evt) }
            id="form-data-user"
          >
            {
              Object.keys(dataUser).map((key, index, completeArray) => {
                if (dataUser[key] !== undefined && completeArray.length - 1 !== index) {
                  return <div className="d-flex flex-column pb-2" key={ key }>
                    <label htmlFor={ dataUser[key].label }>
                      { dataUser[key].label }
                    </label>
                    { dataUser[key].type === 'textarea'
                      ? <textarea
                        placeholder={ dataUser[key].placeholder }
                        id={ dataUser[key].label }
                        style={ {height: '10rem'} }
                      />
                      : <input
                        type={ dataUser[key].type }
                        className="py-3"
                        placeholder={ dataUser[key].placeholder }
                        id={ dataUser[key].label }
                      />
                    }
                  </div>;
                }
              })
            }
            <ButtonSave
              type="submit"
              className="btn btn-primary save mb-3 px-3 py-2"
              style={ {fontSize: '1.3rem'} }
              disabled={ isLoading }
            >
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
              Actualizar
            </ButtonSave>
          </FormContainer>
        </ContainerRegisterData>
      </ContainerRegister>
    </section>
  );
};

export default EditUser;