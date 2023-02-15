import React, { useRef, useContext, useEffect, FC } from 'react';
import { View } from 'react-native';
// contexts
import { OutsideClicksContext } from 'contexts/outside-press.context';

export const OutsidePressHandler: FC<{ onOutsidePress: () => void }> = ({
  children,
  onOutsidePress,
}) => {
  const ref = useRef<any>(null);
  const outsideClicksContext = useContext(OutsideClicksContext);

  useEffect(() => {
    const unsubscribe = outsideClicksContext.subscribeOutsideClicks(
      ref,
      onOutsidePress
    );

    return () => {
      unsubscribe();
    };
  }, [outsideClicksContext, onOutsidePress]);

  return <View ref={ref}>{children}</View>;
};
