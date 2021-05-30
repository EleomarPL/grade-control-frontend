import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import '../styles/customizedInput.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    <div className="input-icon bg-white mb-3" id={ placeholder }>
      <i className={ `${classNameIcon} icon-size` }></i>
      <input
        type={ type }
        placeholder={ placeholder }
        className="py-1"
        value={ state }
        onChange={ handleChange }
      />
    </div>
  );
};

PersonalizedInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  classNameIcon: PropTypes.string.isRequired
};

export default PersonalizedInput ;