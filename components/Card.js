import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

const Card = props => {
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableOpacity onPress={props.onSelect}>
                    <View style={styles.container}>
                       
                        <View style={styles.imageContainer}>
                          { 
                            (props.title) === 'Personel Bilgileri' 
                            &&
                            <AntDesign name="idcard" size={75} color='rgba(0,0 ,0,0.4)' />
                          }
                          {
                            (props.title) === 'Makale/Derleme Bilgileri'
                            &&
                            <MaterialCommunityIcons name="file-document-edit-outline" size={75} color='rgba(0,0 ,0,0.4)' />
                          }
                          {
                            (props.title) === '  Proje Bilgileri'
                            &&
                            <FontAwesome5 name="tools" size={70} color='rgba(0,0 ,0,0.4)' />
                          }   
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title} numberOfLines={(props.title).length > 19 ? 2 : 1}>{props.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>        
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: 'rgba(190,190,190, 0.82)',
        height: Dimensions.get('window').height > 600 ? 130 : 120,
        marginHorizontal: Dimensions.get('window').height > 600 ? 20 : 15,
        marginVertical: Dimensions.get('window').height > 600 ? 10 : 5,
        justifyContent: 'center'
      },
      touchable: {
        borderRadius: 10,
        overflow: 'hidden',
        //alignItems: 'center',
        //justifyContent: 'center'
      },
      imageContainer: {
        //width: '30%',
        //height: '100%',
       // justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        paddingLeft: 10
      },
      image: {
        width: '100%',
        height: '100%'
      },
      details: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      },
      title: {
        fontWeight: '500',
        fontSize: Dimensions.get('window').height > 600 ? 20 : 14, 
        flexShrink: 1
      },
      container: {
          flexDirection: 'row',
          //justifyContent: 'space-around',
          alignItems: 'center'
      }
});

export default Card;