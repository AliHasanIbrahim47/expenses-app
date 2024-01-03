import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'DUMMY_PRODUCTS';

export const saveDummyProducts = async (products) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error('Error saving dummy products:', error);
    }
};

export const getDummyProducts = async () => {
    try {
        const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
        return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
        console.error('Error getting dummy products:', error);
        return [];
    }
};

export const getDummyProduct = () => {
    return dummyProducts;
};

export const dummyProducts = [
    {
        id: 'p1',
        name: 'product1',
        price: '12.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2021-09-25",
        description: "Description for Product 1",
        requestsCount: 10
    },
    {
        id: 'p2',
        name: 'product2',
        price: '22.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2022-03-10",
        description: "Description for Product 2",
        requestsCount: 15
    },
    {
        id: 'p3',
        name: 'product3',
        price: '10.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2021-03-15",
        description: "Description for Product 3",
        requestsCount: 15
    },
    {
        id: 'p4',
        name: 'product4',
        price: '35.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2020-03-25",
        description: "Description for Product 4",
        requestsCount: 20
    },
    {
        id: 'p5',
        name: 'product5',
        price: '25.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2022-03-25",
        description: "Description for Product 5",
        requestsCount: 25
    },
    {
        id: 'p6',
        name: 'product6',
        price: '24.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2022-04-25",
        description: "Description for Product 6",
        requestsCount: 5
    },
    {
        id: 'p7',
        name: 'product7',
        price: '17.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2023-01-25",
        description: "Description for Product 7",
        requestsCount: 1
    },
    {
        id: 'p8',
        name: 'product8',
        price: '14.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2022-10-25",
        description: "Description for Product 8",
        requestsCount: 50
    },
    {
        id: 'p9',
        name: 'product9',
        price: '15.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2019-03-25",
        description: "Description for Product 9",
        requestsCount: 40
    },
    {
        id: 'p10',
        name: 'product10',
        price: '11.99',
        imgSource: require('../../assets/favicon.png'),
        date: "2018-03-25",
        description: "Description for Product 10",
        requestsCount: 45
    },
];

saveDummyProducts(dummyProducts);