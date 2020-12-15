import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import StyleConsts from "../style/styleConstants";


const SearchResult = ({addResultToCollection, name, address, rating}) => {

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.text}>{address}</Text>
                    <Text style={styles.text}>{rating}</Text>
                </View>
                <Text
                    style={styles.plus}
                    onPress={addResultToCollection}
                >
                    +
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "black",
        borderBottomWidth: .3,
        justifyContent: "center",
        height: 140 ,
        paddingLeft: StyleConsts.smallMargin,
        paddingRight: StyleConsts.smallMargin,
    },
    text: {
        marginTop: StyleConsts.smallMargin,
        marginBottom: StyleConsts.smallMargin,
        color: StyleConsts.secondaryColor,
        fontWeight: "bold"
    },
    name: {
        marginTop: StyleConsts.smallMargin,
        marginBottom: StyleConsts.extraSmallMargin,
        color: StyleConsts.secondaryColor,
        fontWeight: "bold",
        fontSize: StyleConsts.largeText
    },
    plus: {
        fontSize: 50,
        fontWeight: "bold",
        color: StyleConsts.secondaryColor,
    },
    box: {
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});


export default SearchResult;
