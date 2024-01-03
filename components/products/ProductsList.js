import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { getDummyProducts } from './dummyData';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../ui/CustomButton';

// function renderProduct(itemData) {
//     function handlePressProduct() {
//         navigation.navigate('ProductDetailsScreen', { productID: itemData.item.id });
//     };
//     return <ProductCard key={itemData.item.name} product={itemData.item} onPress={handlePressProduct} />;
// };

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    const fetchDummyProducts = async () => {
        const storedProducts = await getDummyProducts();
        setProducts(storedProducts);
    };

    useEffect(() => {
        fetchDummyProducts();
    }, []);

    const handleSwiper = () => {
        navigation.navigate('Swiper');
    };

    const handleSort = (property) => {
        const sortedProducts = [...products];

        sortedProducts.sort((a, b) => {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        });

        setProducts(sortedProducts);
    };

    return (
        <View style={styles.rootContainer}>
            <View style={{ flexDirection: 'row',gap: 8, justifyContent: 'space-between', marginBottom: 10 }}>
                <CustomButton onPress={() => handleSort('name')} >{'Sort by Name'}</CustomButton>
                <CustomButton onPress={() => handleSort('price')} >{'Sort by Price'}</CustomButton>
                <CustomButton onPress={() => handleSort('date')} >{'Sort by Date'}</CustomButton>
            </View>

            <FlatList
                data={products}
                renderItem={({ item }) => {
                    return <ProductCard product={item}
                        onPress={() => { navigation.navigate('ProductDetails', { data: item }); }}
                    />
                }}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.buttons}>
                <CustomButton onPress={handleSwiper}>{'Go to Swiper'}</CustomButton>
            </View>
        </View>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    buttons: {
        margin: 10,
    }
});
