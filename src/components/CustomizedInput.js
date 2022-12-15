import { useEffect } from 'react';
import { Input } from '@nextui-org/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PersonalizedInput = ({type, placeholder, state, setState, classNameIcon}) => {
  const handleChange = (evt) => {
    setState(evt.target.value);
  };
  function focusToInput() {
    this.querySelector('input').focus();
  }
  useEffect(() => {
    const icon = document.getElementById(placeholder);
    icon.addEventListener('click', focusToInput);

    return () => {
      icon.removeEventListener('click', focusToInput);
    };
  }, []);
  return (
    <ContainerInputs id={ placeholder }>
      
      <InputPersonalized
        contentLeft={ <IconSize className={ classNameIcon }></IconSize> }
        type={ type }
        placeholder={ placeholder }
        value={ state }
        onChange={ handleChange }
      />
    </ContainerInputs>
  );
};

PersonalizedInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  classNameIcon: PropTypes.string.isRequired
};

const InputPersonalized = styled(Input)`
  width: 100%;
  border: 1px solid rgba(9, 113, 163, 1);
  margin-bottom: 10px;
`;
const IconSize = styled.i`
  opacity: 0.7;
  font-size: 1.25rem;
  padding-right: 5px;
`;
const ContainerInputs = styled.div`
  width: 100%;
  & div {
    width: 100%;
  }
`;

export default PersonalizedInput ;