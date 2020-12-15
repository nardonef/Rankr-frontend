import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import StyleConsts from "../style/styleConstants";


const CollectionItem = ({name, address, rating}) => {

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.text}>{address}</Text>
                <Text style={styles.text}>{rating}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "black",
        borderBottomWidth: .3,
        height: 140 ,
        paddingLeft: StyleConsts.smallMargin,
        paddingRight: StyleConsts.smallMargin,
        justifyContent: "center",
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
    }
});


export default CollectionItem;
