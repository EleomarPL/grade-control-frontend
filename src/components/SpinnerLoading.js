import { Container, Loading } from '@nextui-org/react';

const SpinnerLoading = () => {
  return (
    <Container fluid css={ {margin: 'auto'} }>
      <Loading size="lg" type="points" />
    </Container>
  );
};

export default SpinnerLoading;