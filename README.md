<p align="center">
<img src="./logo.png" alt='logo' width='40%'>
</p>

Handle outside press in react-native application

## Advantages

- Lightweight
- Typesafe
- Zero dependency

## Installation

```sh
npm install react-native-outside-press-handler
```
```sh
yarn add react-native-outside-press-handler
```


## Usage

#### Wrap your app in `OutsidePressController`

```tsx
import { OutsidePressController } from 'react-native-outside-press-handler';

export const App: FC = () => (
  <OutsidePressController style={{ flex: 1 }}>
    {/* Rest of your app code */}
  </OutsidePressController>
)
```

> Note: In a typical React Native app, the OutsidePressController should be only used once in your app at the root. You shouldn't nest multiple OutsidePressController unless you have a specific use case for them.

#### Handle outside press by using `OutsidePressHandler`

```tsx
import React, { useCallback, FC } from 'react';
import { OutsidePressHandler } from 'react-native-outside-press-handler';

export const MyBeautifulComponent: FC = () => {

  const handleOutsidePress = useCallback(() => {
    console.log('hello world!')
  }, [])

  return (
    <OutsidePressHandler onOutsidePress={handleOutsidePress}>
      {/* Rest of your beautiful component */}
    </OutsidePressHandler>
  )
}
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.


## License

MIT

---
