import React, { useRef, useState, useEffect } from 'react';
import { Animated, FlatList, View, StyleSheet } from 'react-native';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import { useNavigation } from '@react-navigation/native';
import { getDummyProducts } from '../../components/products/dummyData';
import CustomButton from '../ui/CustomButton';

const Slider = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const intervalIdRef = useRef(null);
    const [swiperProducts, setSwiperProducts] = useState([]);
    const navigation = useNavigation();

    const fetchDummyProducts = async () => {
        const storedProducts = await getDummyProducts();
        const swiperAfterSorting = storedProducts.sort((a, b) => b.requestsCount - a.requestsCount);
        setSwiperProducts(swiperAfterSorting);
    };

    useEffect(() => {
        fetchDummyProducts();
    }, []);

    const handleOnScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    },
                },
            },
        ],
        {
            useNativeDriver: false,
        },
    );

    const handleOnScrollEndDrag = event => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const newIndex = Math.round(contentOffset.x / layoutMeasurement.width);
        setIndex(newIndex);
    };

    const scrollToNextItem = () => {
        const newIndex = (index + 1) % swiperProducts.length;
        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        setIndex(newIndex);
    };

    useEffect(() => {
        intervalIdRef.current = setInterval(scrollToNextItem, 3000);

        return () => clearInterval(intervalIdRef.current);
    }, [index, swiperProducts.length]);

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <CustomButton onPress={() => { navigation.goBack() }}>{'Go Back'}</CustomButton>
            </View>
            <FlatList
                ref={flatListRef}
                data={swiperProducts}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onScrollEndDrag={handleOnScrollEndDrag}
            />

            <Pagination data={swiperProducts} scrollX={scrollX} index={index} />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    button: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    }
});