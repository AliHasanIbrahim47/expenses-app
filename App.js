import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import SwiperScreen from './screens/SwiperScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const { persistor, store } = configureStore();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Swiper" component={SwiperScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      {/* if we want to show the products only for the logged in users we must put the products screens here */}

      {/* <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Swiper" component={SwiperScreen} /> */}

    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContextProvider>
            <StatusBar style="light" />
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
          </AuthContextProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default function App() {
  return <Navigation />;
}
