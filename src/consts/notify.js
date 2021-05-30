import {toast} from 'react-toastify';

export const notify = (message) => toast(`${message}`, {
  position: 'top-right', className: 'text-dark',
  autoClose: 5000, hideProgressBar: false,
  closeOnClick: true, pauseOnHover: true,
  draggable: true, progress: undefined
});