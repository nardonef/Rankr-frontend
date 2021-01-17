import React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import AppIntroSlider from '@lomelidev/react-native-walkthrough';
import StyleConsts from "../style/styleConstants";

const slides = [
    {
        key: 'somethun',
        title: 'Create Collections!',
        text: 'A collection is a grouping of items where you can rank the items you add to the collections. Keep track of your favorite restaurants. Or keep a collection a places you\'ve been meaning to try!',
        image: require('../assets/walkthrough/collections.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Add Items To Your Collections!',
        text: 'Search for items to add to your collection using natural language. Cant remember that sushi restaurant you went to last week? Search "Sushi near me"!',
        image: require('../assets/walkthrough/search.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun1',
        title: 'Rank Items In Your Collections!',
        text: 'Order and rank Itmes inside your collection by dragging and dropping!',
        image: require('../assets/walkthrough/rank.png'),
        backgroundColor: '#22bcb5',
    }
];

const Walkthrough = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <SafeAreaView style={styles.view}>
                <View style={styles.container}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.image} source={item.image} />
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const onDone = () => {
        navigation.navigate('Home')
    }

    return <AppIntroSlider
        renderItem={renderItem}
        slides={slides}
        onDone={onDone}
    />;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: StyleConsts.margin,
        backgroundColor: StyleConsts.backgroundColor,
    },
    view: {
        backgroundColor: StyleConsts.backgroundColor,
        flex: 1,
    },
    title: {
        fontSize: StyleConsts.largeText,
        color: StyleConsts.secondaryColor,
        paddingBottom: StyleConsts.margin,
    },
    text: {
        paddingTop: StyleConsts.margin,
        color: StyleConsts.secondaryColor,
    },
    image: {
        width: '100%',
        height: '85%',
        paddingBottom: StyleConsts.margin,
    }
});

export default Walkthrough;
