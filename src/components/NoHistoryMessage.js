import { Text } from '@nextui-org/react';

const NoHistoryMessage = () => {
  return (
    <Text
      size={ 30 }
      css={ {
        textGradient: '45deg, $purple600 -20%, $pink600 100%',
        textAlign: 'center',
        margin: '20px 0'
      } }
      weight="bold"
    >
      Sin historial
    </Text>
  );
};

export default NoHistoryMessage;