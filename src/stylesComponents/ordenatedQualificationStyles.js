import styled from 'styled-components';

export const DivUnit = styled.div`
  width: 100%;
  padding-top: 0;
  margin-top: 0;
  background: rgb(87, 87, 87);
  color: white;
`;
export const StatusQualification = styled.div`
  background: ${({ isApproved }) => isApproved ? 'greenyellow' : 'red' || 'red'};
`;