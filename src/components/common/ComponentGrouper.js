import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentGrouper = ({ children }) => {
  return (
    <ContainerGrouper>
      { children }
    </ContainerGrouper>
  );
};
ComponentGrouper.propTypes = {
  children: PropTypes.node
};

const ContainerGrouper = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-bottom: 5px;
`;

export default ComponentGrouper;