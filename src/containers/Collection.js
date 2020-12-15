import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import SortableList from 'react-native-sortable-list';
import api from "../api";
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import Loader from "../components/loader";
import StyleConsts from "../style/styleConstants";
import CollectionItem from "../components/collectionItem";
import {formatAddress} from "./Search";
import FlashMessage from "react-native-flash-message";

const Collection = ({navigation, route}) => {
    const collection = route.params.collection
    const [items, setItems] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const errorMessageRef = useRef(null);
    const {tokens, email} = useSelector(state => state);
    const isFocused = useIsFocused();


    useEffect(() => {
        getCollection().then()
    }, [isFocused])

    const getCollection = async () => {
        setShowLoader(true);
        try {
            const response = await api('GET', `/collection/${collection.name}`, tokens, email);
            if (!response[0]) {
                console.log(response);
                errorMessageRef.current.showMessage({
                    message: 'Error getting collection items',
                    type: "danger",
                });
            }
            setItems(response[0].items);
        } catch (e) {
            console.log(e)
        }
        setShowLoader(false);
    }

    const renderRow = ({data, active}) => {
        return <CollectionItem name={data.name}
                               address={formatAddress(data.formatted_address)}
                               rating={data.rating}/>
    }

    const reorderCollection = async (originalSpot,listOrder) => {
        let newList = [...items]

        listOrder.forEach((itemIndex, index) => {
            itemIndex = parseInt(itemIndex);
            if (itemIndex === index) {
                return;
            }
            const itemMoved = newList[itemIndex];

            itemMoved.order = index;

            newList[itemIndex] = itemMoved;
        });

        setItems(newList)

        try {
            await api('PUT', `/collection/${collection.name}`, tokens, email, {items: newList});
        } catch (e) {
            errorMessageRef.current.showMessage({
                message: 'Error saving new list order',
                type: "danger",
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {showLoader && <Loader/>}
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <Text
                        style={styles.back}
                        onPress={() => navigation.goBack()}>
                        BACK
                    </Text>
                    <Text
                        style={styles.back}
                        onPress={() => navigation.navigate('Search', {collection})}>
                        SEARCH
                    </Text>
                </View>
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={items.sort((a,b) => a.order - b.order)}
                    onReleaseRow={reorderCollection}
                    renderRow={renderRow} />
            </View>
            <FlashMessage ref={errorMessageRef} position="top" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: StyleConsts.backgroundColor,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    scrollView: {
        width: '90%',
        borderColor: "black",
        borderWidth: .3,
    },
    list: {
        flex: 20,
    },
    row: {
        height: 80,
        flex: 1,
        borderColor: 'black',
        borderWidth: .3,
    },
    back: {
        paddingTop: StyleConsts.smallMargin,
        paddingLeft: StyleConsts.margin,
        paddingRight: StyleConsts.margin,
        color: StyleConsts.secondaryColor,
        fontWeight: "bold",

    }
});


export default Collection;
