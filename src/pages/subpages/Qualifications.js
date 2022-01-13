import { useEffect, useState, Suspense, lazy } from 'react';

import { HashRouter, NavLink, Switch } from 'react-router-dom';
import { getAllQualificationUser } from '../../services/apis/qualification';
import { notifyError, notifyInfo, notifyWarning } from '../../consts/notify';

import '../../styles/home.css';
import PrivateRoute from '../../routes/PrivateRoute';
import { ModalAddQualification, showModalStatic } from '../../components/ModalAddQualification';
import { ModalConfirmDelete } from '../../components/ModalConfirmDelete';
import ListQualifications from '../../components/ListQualifications';
import SpinnerLoading from '../../components/SpinnerLoading';
const OrdenatedQualification = lazy(() => import('../../components/OrdenatedQualification'));

const Qualifications = () => {
  const [qualifications, setQualification] = useState([]);
  const [isCreated, setIsCreated] = useState(true);
  const [dataToEdit, setDataToEdit] = useState({});
  const [idQualificationDelete, setIdQualificationDelete] = useState(null);

  const [isLoadingQualifications, setIsLoadingQualifications] = useState(false);

  useEffect(() => {
    setIsLoadingQualifications(true);
    const getToken = window.localStorage.getItem('session');
    getAllQualificationUser({token: JSON.parse(getToken)}).then(response => {
      setQualification(response.data);
      if (response.data.length === 0) {
        notifyInfo('Aun no tienes calificaciones agregadas');
      }
      setIsLoadingQualifications(false);
    }).catch(err => {
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      } else if (err.response.data.error === 'Token missing or invalid') {
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      }
      setIsLoadingQualifications(false);
    });
  }, []);
  const showModal = () => {
    setIsCreated(true);
    showModalStatic();
  };
  return (
    <>
      <HashRouter>
        <div className="d-flex flex-wrap justify-content-center pt-4 pb-2" style={ {fontSize: '2.1rem'} }>
          <strong>Calificaciones</strong>
        </div>
        <div className="home">
          <div className="d-flex flex-wrap justify-content-center">
            <NavLink
              className="option-router"
              exact
              to={ '/' }
              activeClassName="active-nav-user"
            >
              Lista
            </NavLink>
            <NavLink
              className="option-router"
              to={ '/ordenated' }
              activeClassName="active-nav-user"
            >
              Ordenados
            </NavLink>
          </div>
          <div className="content p-3 mt-3">
            <Switch>
              <PrivateRoute exact path={ '/' }>
                <ListQualifications
                  qualifications={ qualifications }
                  setIsCreated={ setIsCreated }
                  setDataToEdit={ setDataToEdit }
                  setIdQualificationDelete={ setIdQualificationDelete }
                />
                { isLoadingQualifications &&
                  <SpinnerLoading />
                }
              </PrivateRoute>
              <PrivateRoute path={ '/ordenated' }>
                <Suspense fallback={ <SpinnerLoading /> }>
                  <OrdenatedQualification
                    qualifications={ qualifications }
                  />
                </Suspense>
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </HashRouter>
      <div className="add-new-qualification add-new-qualification">
        <button type="button" onClick={ showModal }>
          <i className="bi bi-plus-circle-fill" />
        </button>
      </div>
      <ModalAddQualification
        setQualifications={ setQualification }
        qualifications={ qualifications }
        isCreated={ isCreated }
        dataToEdit={ dataToEdit }
      />
      <ModalConfirmDelete
        idQualificationDelete={ idQualificationDelete }
        setQualifications={ setQualification }
        qualifications={ qualifications }
      />
    </>
  );
};

export default Qualifications;