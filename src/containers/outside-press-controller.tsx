import React, { useRef, useCallback, FC, MutableRefObject } from 'react';
import {
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
// contexts
import { OutsideClicksContext } from '../contexts/outside-press.context';
// utils
import { isPressInsideComponent } from '../utils/press.utils';
// types
import type { ChildrenProp } from '../types/react.types';

type OutsidePressControllerProps = ChildrenProp & {
  style?: StyleProp<ViewStyle>;
};

export const OutsidePressController: FC<OutsidePressControllerProps> = ({
  children,
  style,
}) => {
  const subscribers = useRef<
    { element: MutableRefObject<any>; cb: () => void }[]
  >([]);
  const subscribeOutsideClicks = useCallback(
    (element: MutableRefObject<any>, cb: () => void) => {
      const newSubscriber = { element, cb };

      subscribers.current = [...subscribers.current, newSubscriber];

      return () => {
        subscribers.current = subscribers.current.filter(
          (subscriber) => subscriber !== newSubscriber
        );
      };
    },
    []
  );

  const handleStartShouldSetResponder = useCallback(
    (ev: GestureResponderEvent) => {
      ev.persist();

      subscribers.current.forEach((subscriber) => {
        try {
          if (!isPressInsideComponent(ev.target, subscriber.element.current)) {
            subscriber.cb();
          }
        } catch (e) {
          console.error(e);
        }
      });

      return true;
    },
    []
  );

  return (
    <OutsideClicksContext.Provider
      value={{
        subscribeOutsideClicks,
      }}
    >
      <View
        style={style}
        onStartShouldSetResponder={handleStartShouldSetResponder}
      >
        {children}
      </View>
    </OutsideClicksContext.Provider>
  );
};
