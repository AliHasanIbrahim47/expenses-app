import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={item.imgSource} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        width,
        height,
        alignItems: 'center',
    },
    image: {
        flex: 0.6,
        width: '100%',
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginVertical: 12,
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});