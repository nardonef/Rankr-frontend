import React from 'react';
import {ActivityIndicator} from "react-native";
import StyleConsts from "../style/styleConstants";

const Loader = () => <ActivityIndicator style={StyleConsts.loading} size="large" color="white" />

export default Loader;
