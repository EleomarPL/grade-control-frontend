import { Loading } from '@nextui-org/react';

const SpinnerLoadingButton = () => {
  return (
    <Loading color="currentColor" type="default"
      css={ { px: '$2' } }
    />
  );
};

 

export default SpinnerLoadingButton;