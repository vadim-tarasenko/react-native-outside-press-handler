import React, { useRef, useContext, useEffect, FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
// contexts
import { OutsideClicksContext } from '../contexts/outside-press.context';
import type { ChildrenProp } from '../types/react.types';

type OutsidePressHandlerProps = ChildrenProp & {
  onOutsidePress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const OutsidePressHandler: FC<OutsidePressHandlerProps> = ({
  children,
  onOutsidePress,
  style,
}) => {
  const ref = useRef<View>(null);
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

  return (
    <View ref={ref} style={style}>
      {children}
    </View>
  );
};
