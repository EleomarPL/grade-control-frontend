import { toast } from 'react-toastify';

const settings = {
  position: 'top-right',
  autoClose: 5000, hideProgressBar: false,
  closeOnClick: true, pauseOnHover: true,
  draggable: false, progress: undefined
};

export const notify = (message) => toast.dark(`${message}`, settings);
export const notifyError = (message) => toast.error(`${message}`, settings);
export const notifySuccess = (message) => toast.success(`${message}`, settings);
export const notifyInfo = (message) => toast.info(`${message}`, settings);
export const notifyWarning = (message) => toast.warn(`${message}`, settings);