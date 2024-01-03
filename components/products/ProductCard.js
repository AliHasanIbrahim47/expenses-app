import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';

const ProductCard = ({ product, onPress }) => {
    return (
        <Pressable onPress={() => onPress(product)}>
            <View style={styles.rootContainer}>
                <View>
                    <Image style={styles.image} source={product.imgSource} />
                </View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.text}>{`Price: $${product.price}`}</Text>
                <Text style={styles.text}>{`Date: ${product.date}`}</Text>
            </View>
        </Pressable>
    );
};

export default ProductCard;

const deviceWidth = Dimensions.get('window').width;

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
        fontSize: deviceWidth < 450 ? 20 : 30,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: deviceWidth < 450 ? 12 : 18,
        marginBottom: 8,
    },
    image: {
        margin: 10,
        width: deviceWidth < 450 ? 50 : 100,
        height: deviceWidth < 450 ? 50 : 100,
    }
});
