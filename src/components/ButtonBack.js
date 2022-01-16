import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      style={ {
        background: 'transparent',
        color: '#3277c5',
        border: 'none'
      } }
      type="button"
      onClick={ () => navigate(-1) }
      className="button fw-bold pb-2"
    >
      <i className="bi bi-caret-left"></i>
      <span>Regresar</span>
    </button>
  );
};

export default ButtonBack;