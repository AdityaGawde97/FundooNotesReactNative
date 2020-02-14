import React from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './src/Navigator/RootNavigator';
import Store from './src/Redux/Store'
import { Provider } from 'react-redux';

const prefix = 'fundoonotes://';

function App(props) {
  return (
    <Provider store={Store}>
      <RootNavigator uriPrefix={prefix} />
    </Provider>
  );
}


//const MainApp = () => <App uriPrefix={prefix} />;

export default App;