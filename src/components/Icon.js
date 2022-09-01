import PropTypes from 'prop-types';

const Icon = ({ classNameIcon, textNV }) => {
  return (
    <>
      <i className={ `bi ${classNameIcon}` } />
      <span className="visually-hidden">{ textNV }</span>
    </>
  );
};
Icon.propTypes = {
  classNameIcon: PropTypes.string.isRequired,
  textNV: PropTypes.string.isRequired
};

export default Icon;