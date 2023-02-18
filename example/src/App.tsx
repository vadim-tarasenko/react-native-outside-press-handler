import React, { FC, useCallback } from 'react';

import { StyleSheet, View, Button } from 'react-native';
import {
  OutsidePressController,
  OutsidePressHandler,
} from 'react-native-outside-press-handler';

const MyComponent: FC = () => {
  const handleOutsidePress = useCallback(() => {
    console.log('outside press');
  }, []);
  return (
    <OutsidePressHandler onOutsidePress={handleOutsidePress}>
      <Button title="press me" />
    </OutsidePressHandler>
  );
};

export default function App() {
  React.useEffect(() => {}, []);

  return (
    <OutsidePressController style={{ flex: 1 }}>
      <View style={styles.container}>
        <MyComponent />
      </View>
    </OutsidePressController>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
