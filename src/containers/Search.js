import React, {useState, useRef} from 'react';
import {Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import SearchBar from 'react-native-search-bar';
import {useSelector} from "react-redux";
import api from "../api";
import StyleConsts from "../style/styleConstants";
import SearchResult from "../components/searchResult";
import Loader from '../components/loader'
import FlashMessage from "react-native-flash-message";
const {GCP_PLACES_API_KEY} = require('../constants').constants;


const Search = ({navigation, route}) => {
    const collection = route.params.collection;
    const searchBarRef = React.createRef();
    const errorMessageRef = useRef(null);
    const [showLoader, setShowLoader] = useState(false);
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const {tokens, email} = useSelector(state => state);

    const searchRestaruants = async () => {
        setShowLoader(true)
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${searchText}&key=${GCP_PLACES_API_KEY}`);

            console.log(res.status); // Will show you the status
            console.log(res.ok);
            if (!res.ok) {
                throw await res.json();
            }

            const response = await res.json();
            console.log(response);

            setResults(formatResults(response.results));
        } catch(e) {
            console.log(e);
            errorMessageRef.current.showMessage({
                message: 'Error getting search results',
                type: "danger",
            });
        }
        setShowLoader(false);
    }

    const addResultToCollection = async (item) => {
        setShowLoader(true);
        try {
            const newItem = await api('PUT', '/collection', tokens, email, {
                item: item,
                name: collection.name
            });

            collection.items.push(newItem.item);
            setShowLoader(false);
            navigation.navigate('Collection', {collection});
        } catch (e) {
            console.log(e)
            errorMessageRef.current.showMessage({
                message: 'Error adding to collection',
                type: "danger",
            });
        }
        setShowLoader(false);
    }

    const formatResults = (results) => {
        return results.map(result => {
            return <SearchResult
                name={result.name}
                address={formatAddress(result.formatted_address)}
                rating={result.rating}
                addResultToCollection={() => addResultToCollection(result)}
            />
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {showLoader && <Loader/>}
            <Text
                style={styles.back}
                onPress={() => navigation.goBack()}>
                BACK
            </Text>
            <SearchBar
                ref={searchBarRef}
                placeholder="Search"
                onSearchButtonPress={() => {
                    searchBarRef.current.blur()
                    searchRestaruants().then()
                }}
                onChangeText={setSearchText}
            />
            <ScrollView>
                {results}
            </ScrollView>
            <FlashMessage ref={errorMessageRef} position="top" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: StyleConsts.smallMargin,
        backgroundColor: StyleConsts.backgroundColor,

    },
    back: {
        paddingTop: StyleConsts.smallMargin,
        paddingLeft: StyleConsts.margin,
        paddingRight: StyleConsts.margin,
        color: StyleConsts.secondaryColor,
        paddingBottom: StyleConsts.smallMargin,
        fontWeight: "bold",
    }
});

export const formatAddress = (address) => {
    let parts = address.split(',')

    return `${parts[0]}, ${parts[1]}`
}

export default Search;
