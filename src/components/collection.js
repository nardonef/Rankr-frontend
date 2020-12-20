import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import StyleConsts from "../style/styleConstants";


const Collection = ({collection, navigation}) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Collection', {collection})}
            style={styles.collectionContainer}
        >
            <View style={styles.collectionTextContainer}>
                <Text style={styles.collectionNameText}>{collection.name}</Text>
                {/*TODO*/}
                <Text style={styles.collectionContainerText}>{collection.sort}</Text>
                <Text style={styles.collectionContainerText}>{collection.items.length} Items</Text>
            </View>
            <View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    collectionContainer: {
        borderColor: StyleConsts.secondaryColor,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: 100 ,
        margin: StyleConsts.smallMargin,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: StyleConsts.accentColor1,
        borderRadius: 7,
    },
    collectionContainerText: {
        color: StyleConsts.secondaryColor,
        fontWeight: 'bold',
        fontSize: StyleConsts.text,
    },
    collectionNameText: {
        color: StyleConsts.secondaryColor,
        fontWeight: 'bold',
        fontSize: StyleConsts.largeText,
    },
    collectionTextContainer: {
        paddingLeft: StyleConsts.margin,
    },
});


export default Collection;
