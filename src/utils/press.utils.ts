export const isPressInsideComponent = (
  target: any,
  nestedViewRef: any
): boolean => {
  if (
    target &&
    nestedViewRef &&
    target._nativeTag === nestedViewRef._nativeTag
  ) {
    return true;
  }

  if (nestedViewRef._children && nestedViewRef._children.length > 0) {
    for (let index = 0; index <= nestedViewRef._children.length - 1; index++) {
      if (isPressInsideComponent(target, nestedViewRef._children[index])) {
        return true;
      }
    }
  }

  return false;
};
