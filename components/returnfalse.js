import React, { useEffect } from "react";
import { BackHandler } from "react-native";

const ReturnFalse = () => {
    const handleBackButton = () => {
        return true;
    };
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);
}

export default ReturnFalse;