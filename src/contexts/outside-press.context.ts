import { createContext, MutableRefObject } from 'react';

type Unsubscribe = () => void;

type OutsideClicksContextValues = {
  subscribeOutsideClicks: (
    element: MutableRefObject<any>,
    cb: () => void
  ) => Unsubscribe;
};

export const OutsideClicksContext = createContext<OutsideClicksContextValues>({
  subscribeOutsideClicks: () => {
    return () => {};
  },
});
