import PropTypes from 'prop-types';

const Icon = ({ classNameIcon }) => {
  return (
    <>
      <i className={ `bi ${classNameIcon}` }
        style={ { marginRight: '5px' } }
      />
    </>
  );
};
Icon.propTypes = {
  classNameIcon: PropTypes.string.isRequired,
  textNV: PropTypes.string
};

export default Icon;