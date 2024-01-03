import React, { useContext, useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  const retrieveEmailFromCache = async () => {
    try {
      const cachedEmail = await AsyncStorage.getItem('cachedEmail');
      return cachedEmail;
    } catch (error) {
      console.error('Error retrieving email from cache:', error);
      return null;
    }
  };

  const retrievePasswordFromCache = async () => {
    try {
      const cachedPassword = await AsyncStorage.getItem('cachedPassword');
      return cachedPassword;
    } catch (error) {
      console.error('Error retrieving password from cache:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadCachedData = async () => {
      const cachedEmail = await retrieveEmailFromCache();
      const cachedPassword = await retrievePasswordFromCache();

      if (cachedEmail) {
        setEmail(cachedEmail);
      }

      if (cachedPassword) {
        setPassword(cachedPassword);
      }
    };

    loadCachedData();
  }, []);

  async function loginHandler() {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      authCtx.authenticate(token);

      await AsyncStorage.setItem('cachedEmail', email);
      await AsyncStorage.setItem('cachedPassword', password);

      const dispatch = useDispatch();
      const user = { username: 'example_user' };
      dispatch(loginSuccess(user));
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  function productsHandler() {
    navigation.navigate('Products');
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View>
      <AuthContent
        isLogin
        onAuthenticate={() => loginHandler({ email, password })}
        setEmail={setEmail}
        setPassword={setPassword}
        emailValue={email}
        passwordValue={password}
      />
      <View style={styles.buttons}>
        <CustomButton onPress={productsHandler}>
          {'Go To Products Screen'}
        </CustomButton>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 40,
    height: 100,
    alignItems: 'center',
  },
});
