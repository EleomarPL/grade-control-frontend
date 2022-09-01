import PropTypes from 'prop-types';

const ComponentGrouper = ({ nBloquesFila = 2, nEspacio = 1, children }) => {
  return (
    <div className={ `row row-cols-lg-${nBloquesFila} g-${nEspacio}` }>
      { children }
    </div>
  );
};
ComponentGrouper.propTypes = {
  nBloquesFila: PropTypes.number,
  nEspacio: PropTypes.number,
  children: PropTypes.node
};

export default ComponentGrouper;