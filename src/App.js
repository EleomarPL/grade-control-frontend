import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './styles/index.css';
import '@fontsource/roboto';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

import { AuthProvider } from './context/Auth';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import SpinnerLoading from './components/SpinnerLoading';

const App = () => {
  return (
    <>
      <main>
        <AuthProvider>
          <BrowserRouter>
            <Helmet>
              <meta property="og:site_name" content="Gestiocal" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary" />
            </Helmet>
            <Routes>
              <Route element={ <PublicRoute /> }>
                <Route index
                  element={
                    <>
                      <Helmet>
                        <title>Login | Calificaciones</title>
                        <meta property="og:title" content="Login | Calificaciones" />
                        <meta name="twitter:title" content="Login | Calificaciones" />
                        <meta name="twitter:description" content="Login para acceder, y poder gestionar o controlar tus calificaciones." />
                        <meta name="description" content="Login para acceder, y poder gestionar o controlar tus calificaciones." />
                        <meta property="og:description" content="Login para acceder, y poder gestionar o controlar tus calificaciones." />
                        <meta name="twitter:url" content="https://gestiocal.vercel.app/" />
                        <meta property="og:url" content="https://gestiocal.vercel.app/" />
                      </Helmet>
                      <Suspense fallback={ <SpinnerLoading /> }>
                        <Login />
                      </Suspense>
                    </>
                  }
                />
                <Route path="/register"
                  element={
                    <>
                      <Helmet>
                        <title>Registrarse | Calificaciones</title>
                        <meta name="description" content="Registrate, y obten la facilidad de gestionar tus calificaciones." />
                        <meta name="twitter:title" content="Registrarse | Calificaciones" />
                        <meta name="twitter:description" content="Registrate, y obten la facilidad de gestionar tus calificaciones." />
                        <meta property="og:title" content="Registrarse | Calificaciones" />
                        <meta property="og:description" content="Registrate, y obten la facilidad de gestionar tus calificaciones." />
                        <meta name="twitter:url" content="https://gestiocal.vercel.app/register/" />
                        <meta property="og:url" content="https://gestiocal.vercel.app/register/" />
                      </Helmet>
                      <Suspense fallback={ <SpinnerLoading /> }>
                        <Register />
                      </Suspense>
                    </>
                  }
                />
              </Route>
              <Route element={ <PrivateRoute /> }>
                <Route path="/home/*"
                  element={
                    <>
                      <Suspense fallback={ <SpinnerLoading /> }>
                        <Home />
                      </Suspense>
                    </>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </main>
      <ToastContainer position="top-right"
        autoClose={ 5000 } hideProgressBar={ false }
        newestOnTop={ false } closeOnClick
        rtl={ false } pauseOnFocusLoss
        draggable={ false } pauseOnHover
      />
    </>
  );
};

export default App ;
