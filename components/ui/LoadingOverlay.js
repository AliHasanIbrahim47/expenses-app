import { ActivityIndicator, StyleSheet, Text, View, Dimensions } from 'react-native';

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: deviceWidth < 450 ? 32 : 40,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
