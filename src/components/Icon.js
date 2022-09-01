import PropTypes from 'prop-types';

const Icon = ({ classNameIcon, textNV }) => {
  return (
    <>
      <i className={ `bi ${classNameIcon}` }
        style={ { marginRight: '5px' } }
      />
      { textNV &&
        <span className="visually-hidden">{ textNV }</span>
      }
    </>
  );
};
Icon.propTypes = {
  classNameIcon: PropTypes.string.isRequired,
  textNV: PropTypes.string
};

export default Icon;