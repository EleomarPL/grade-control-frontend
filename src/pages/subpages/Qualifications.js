import { useEffect, useState, Suspense, lazy } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

import { ModalAddQualification, showModalStatic } from '../../components/ModalAddQualification';
import { ModalConfirmDelete } from '../../components/ModalConfirmDelete';
import SpinnerLoading from '../../components/SpinnerLoading';
import '../../styles/home.css';
import useQualification from '../../hooks/useQualification';
import NoQualificationMessage from '../../components/NoQualificationMessage';

const ListQualifications = lazy(() => import('../../components/ListQualifications'));
const OrdenatedQualification = lazy(() => import('../../components/OrdenatedQualification'));

const Qualifications = () => {
  const [qualifications, setQualification] = useState([]);
  const [isCreated, setIsCreated] = useState(true);
  const [dataToEdit, setDataToEdit] = useState({});
  const [idQualificationDelete, setIdQualificationDelete] = useState(null);
  const [isLoadingQualifications, setIsLoadingQualifications] = useState(false);

  const { getAllQualifications } = useQualification();

  useEffect(() => {
    setIsLoadingQualifications(true);

    getAllQualifications().then(res => {
      setIsLoadingQualifications(false);
      if (res) setQualification(res);
    });
  }, []);
  const showModal = () => {
    setIsCreated(true);
    showModalStatic();
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-2" style={ {fontSize: '2.1rem'} }>
        <strong>Calificaciones</strong>
      </div>
      <div className="home">
        <div className="d-flex flex-wrap justify-content-center">
          <NavLink
            className="option-router"
            to={ '' }
            end
            style={ ({ isActive }) => ({
              opacity: isActive && '1',
              border: isActive && 'solid 1px gray',
              borderRadius: isActive && '10px'
            }) }
          >
            Lista
          </NavLink>
          <NavLink
            className="option-router"
            to={ 'ordenated' }
            style={ ({ isActive }) => ({
              opacity: isActive && '1',
              border: isActive && 'solid 1px gray',
              borderRadius: isActive && '10px'
            }) }
          >
            Ordenados
          </NavLink>
        </div>
        { qualifications.length === 0 && !isLoadingQualifications &&
          <NoQualificationMessage />
        }
        <div className="content p-3 mt-3">
          <Routes>
            <Route path="/"
              element={
                <Suspense fallback={ <SpinnerLoading /> }>
                  { qualifications.length !== 0 &&
                    <ListQualifications
                      qualifications={ qualifications }
                      setIsCreated={ setIsCreated }
                      setDataToEdit={ setDataToEdit }
                      setIdQualificationDelete={ setIdQualificationDelete }
                    />
                  }
                  { isLoadingQualifications &&
                    <SpinnerLoading />
                  }
                </Suspense>
              }
            />
            <Route path="ordenated"
              element={
                <Suspense fallback={ <SpinnerLoading /> }>
                  { qualifications.length !== 0 &&
                    <OrdenatedQualification
                      qualifications={ qualifications }
                    />
                  }
                  { isLoadingQualifications &&
                    <SpinnerLoading />
                  }
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
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