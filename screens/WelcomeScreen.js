import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
  const navigation = useNavigation();

  function productsHaandler() {
    navigation.navigate('Products');
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.button}>
        <CustomButton onPress={productsHaandler}>
          {'Go To Products Screen'}
        </CustomButton>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginVertical: 40
  }
});
