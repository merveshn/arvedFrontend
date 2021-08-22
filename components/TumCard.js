import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import MainButton from './MainButton';

const TumCard = props => {
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.yazar}>{props.yazar}</Text>
                <Text style={styles.yil}>{props.yil}</Text>
            </View>
            <View style={{justifyContent:'flex-end'}}>
                <MainButton onPress={props.onPress}>
                    Detay
                </MainButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2.5,
        borderColor: '#284985',
        //padding: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor:'#F2F2F2'
    },
    textContainer: {
        width: '80%'
    },
    title: {
        borderBottomWidth: 2,
        borderColor: '#738289',
        fontSize: Dimensions.get('window').height > 600 ? 18 : 12,
        fontWeight: 'bold',
        marginBottom: 5,
        flexShrink: 1,
    },
    yazar: {
        fontSize: Dimensions.get('window').height > 600 ? 16 : 10, 
        flexShrink: 1,
        marginBottom: 1
    },
    yil:{
        fontSize: Dimensions.get('window').height > 600 ? 12 : 8, 
        color: '#888'
    }
});

export default TumCard;