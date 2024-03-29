import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      ghost color="primary"
      auto
      css={ {
        marginBottom: '10px'
      } }
      type="button"
      onPress={ () => navigate(-1) }
    >
      <i className="bi bi-caret-left"></i>
      Regresar
    </Button>
  );
};

export default ButtonBack;