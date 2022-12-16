import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row, Spacer, Text } from '@nextui-org/react';
import styled from 'styled-components';

import { ModalAddQualification } from '../../components/ModalAddQualification';
import { ModalConfirmDelete } from '../../components/ModalConfirmDelete';
import SpinnerLoading from '../../components/SpinnerLoading';
import NoQualificationMessage from '../../components/NoQualificationMessage';
import useQualification from '../../hooks/useQualification';

const ListQualifications = lazy(() => import('../../components/ListQualifications'));
const OrdenatedQualification = lazy(() => import('../../components/OrdenatedQualification'));

const Qualifications = () => {
  const [qualifications, setQualification] = useState([]);
  const [isCreated, setIsCreated] = useState(true);
  const [dataToEdit, setDataToEdit] = useState({});
  const [idQualificationDelete, setIdQualificationDelete] = useState(null);
  const [isLoadingQualifications, setIsLoadingQualifications] = useState(false);
  const [visibleModalCreateEdit, setVisibleModalCreateEdit] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

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
    setVisibleModalCreateEdit(true);
  };
  return (
    <>
      <Spacer y={ 1 } />
      <Text h2 css={ { textAlign: 'center' } }>Calificaciones</Text>
      <ContainerHome>
        <Container fluid>
          <Row fluid gap={ 1 }
            justify="center"
          >
            <StylesNavLink to="" end>Lista</StylesNavLink>
            <StylesNavLink to="ordenated">Ordenados</StylesNavLink>
          </Row>
        </Container>
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
                      setVisibleCreateEdit={ setVisibleModalCreateEdit }
                      setVisibleDelete={ setVisibleModalDelete }
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
                  <OrdenatedQualification
                    qualifications={ qualifications }
                  />
                  { isLoadingQualifications &&
                    <SpinnerLoading />
                  }
                </Suspense>
              }
            />
          </Routes>
        </div>
      </ContainerHome>
      <DivAddNewQualification>
        <button type="button" onClick={ showModal }>
          <i className="bi bi-plus-circle-fill" />
        </button>
      </DivAddNewQualification>
      <ModalAddQualification
        setQualifications={ setQualification }
        qualifications={ qualifications }
        isCreated={ isCreated }
        dataToEdit={ dataToEdit }
        setDataToEdit={ setDataToEdit }
        visible={ visibleModalCreateEdit }
        setVisible={ setVisibleModalCreateEdit }
      />
      <ModalConfirmDelete
        idQualificationDelete={ idQualificationDelete }
        setQualifications={ setQualification }
        qualifications={ qualifications }
        visible={ visibleModalDelete }
        setVisible={ setVisibleModalDelete }
      />
    </>
  );
};

const ContainerHome = styled.div`
  padding: 0;
  margin: 0;
`;
const StylesNavLink = styled(NavLink)`
  border: none;
  opacity: 0.5;
  color: black;
  width: 20%;
  padding: 10px 10px;

  text-decoration: none;
  font-size: 1.1rem;
  text-align: center;
  &.active {
    opacity: 1;
    border: solid 1px gray;
    border-radius: 10px;
  }

  @media only screen and (max-width: 700px) {
    width: 40%;
  }
`;
const DivAddNewQualification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  overflow: hidden;
  font-size: 3rem;
  cursor: pointer;
  z-index: 99999;

  transition: all .5s;

  & button{
    background: transparent;
    border: none;
  }
  &:hover{
    transform: scale(1.2);
  }

  @media only screen and (max-width: 700px) {
    font-size: 2.5rem;
  }
`;

export default Qualifications;