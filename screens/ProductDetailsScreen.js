import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import CustomButton from '../components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {
    const product = route.params.data;
    const navigation = useNavigation();

    return (
        <Modal animationType='slide'>
            <View style={styles.rootContainer}>
                <View>
                    <Image style={styles.image} source={product.imgSource} />
                </View>
                <Text style={styles.title}>{`Name: ${product.name}`}</Text>
                <Text style={styles.text}>{`Description: ${product.description}`}</Text>
                <Text style={styles.text}>{`Price: $${product.price}`}</Text>
                <Text style={styles.text}>{`Date: ${product.date}`}</Text>
                <Text style={styles.text}>{`Number of Requests: ${product.requestsCount}`}</Text>
                <CustomButton onPress={() => { navigation.goBack() }}>{'Close'}</CustomButton>
            </View>
        </Modal>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        margin: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 12,
        marginBottom: 8,
    },
    image: {
        margin: 10
    }
});