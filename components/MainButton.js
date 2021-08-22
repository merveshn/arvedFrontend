import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}> 
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    button: {
        backgroundColor: '#738289',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        color: 'black',
        fontSize: Dimensions.get('window').height > 600 ? 12 : 8,
        fontWeight: 'bold'
    }
});

export default MainButton;