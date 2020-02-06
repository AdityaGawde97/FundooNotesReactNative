import React from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './src/Navigator/RootNavigator';
import Store from './src/Redux/Store'
import { Provider } from 'react-redux';

function App(props) {
  return (
    <Provider store={Store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;