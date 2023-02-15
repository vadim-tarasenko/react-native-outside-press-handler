import React, { useRef, useCallback, FC, MutableRefObject } from 'react';
import { View, GestureResponderEvent } from 'react-native';
// contexts
import { OutsideClicksContext } from 'contexts/outside-press.context';
// utils
import { isPressInsideComponent } from 'utils/press.utils';

export const OutsidePressController: FC = ({ children }) => {
  const subscribers = useRef<
    { element: MutableRefObject<any>; cb: () => void }[]
  >([]);

  const subscribeOutsideClicks = useCallback(
    (element: MutableRefObject<any>, cb: () => void) => {
      const newSubscriber = { element, cb };

      subscribers.current = [...subscribers.current, newSubscriber];

      return () => {
        subscribers.current.filter(
          (subscriber) => subscriber !== newSubscriber
        );
      };
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
        onStartShouldSetResponder={(ev: GestureResponderEvent) => {
          ev.persist();

          subscribers.current.forEach((subscriber) => {
            if (
              !isPressInsideComponent(ev.target, subscriber.element.current)
            ) {
              console.log('clicked outside');
              subscriber.cb();
            }
          });

          return true;
        }}
      >
        {children}
      </View>
    </OutsideClicksContext.Provider>
  );
};
