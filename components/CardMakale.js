import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const CardMakale = props => {
    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.title}</Text>
                <Text style={styles.quantity}>{props.yil} </Text>   
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
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
        backgroundColor:'#F2F2F2'
    },
    itemData: {
       // flexDirection: 'row',
        //marginTop: 
        //height: '60%',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    quantity: {
        color: '#888',
        fontSize: Dimensions.get('window').height > 600 ? 14 : 10,
        fontWeight: '500'
    },
    mainText: {
        fontWeight: '500',
        fontSize: Dimensions.get('window').height > 600 ? 18 : 14,
        textAlign: 'center',
        flexShrink: 1,
        //marginBottom: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: '40%',
        paddingHorizontal: 20
    }
});

export default CardMakale;
