import React, { useContext } from 'react';

import Auth from '../../context/Auth';

import '../../styles/settings.css';
import { ModalDeleteAccount, showModalStaticDeleteAccount } from '../../components/ModalDeleteAccount';
import { Link } from 'react-router-dom';

const SettingsUser = () => {
  const {userData} = useContext(Auth);

  const showModalConfirm = () => {
    showModalStaticDeleteAccount();
  };

  let traslationToSpanish = {
    name: 'Nombre',
    lastName: 'Apellido paterno',
    motherLastName: 'Apellido materno',
    phone: 'Telefono',
    email: 'Correo electronico',
    userName: 'Usuario'
  };

  return (
    <section>
      <div className="settings-container m-auto py-3">
        <div className="container-settings-data px-4 pt-2">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="indications">
              <strong style={ {fontSize: '1.8rem'} }>Tus datos</strong>
              <p className="pt-1">Hola, estos son tus datos actuales</p>
            </div>
            <div>
              <Link
                to="/home/edit"
                className="btn btn-secondary mb-2"
              >
                Editar mis datos
              </Link>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table" style={ {fontSize: '1rem'} }>
              <tbody>
                { userData !== null &&
                  Object.keys(userData).map((key, index) =>
                    <tr className="text-left mx-2" key={ index }>
                      <td style={ {opacity: '0.5'} }>{ traslationToSpanish[key] }</td>
                      <td>{ userData[key] }</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          <div>
            <Link
              to="/home/editpassword"
              className="btn btn-warning button-delete"
            >
              Cambiar mi contraseña
            </Link>
          </div>
          <div className="py-3">
            <button
              type="button"
              className="btn btn-danger button-delete"
              onClick={ showModalConfirm }
            >
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      </div>
      <ModalDeleteAccount />
    </section>
  );
};


export default SettingsUser;