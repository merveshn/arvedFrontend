import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const condTrue = <Entypo name="check" size={Dimensions.get('window').height > 600 ? 18 : 14} color="black" />;
const condFalse = <Entypo name="cross" size={Dimensions.get('window').height > 600 ? 21 : 16} color="black" />;

const MakaleDetay = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.bolum}>Makale Bilgileri</Text>
            <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.title, fontWeight:'bold', color:'#738289'}}>Adı: </Text> 
                    <Text style={styles.title}>{props.makale.makaleAdi}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.yazar, fontWeight:'bold', color:'#738289'}}>Yazar: </Text>
                    <Text style={styles.yazar}>{props.makale.yazarListesi}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.yil, fontWeight:'bold', color:'#738289'}}>Yıl: </Text>
                    <Text style={styles.yil}>{props.makale.yil}</Text>
                </View>
            </View>
            <Text style={{...styles.bolum, marginTop: 10}}>Dergi Bilgileri</Text>
            <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Adi: </Text>
                    <Text style={styles.dergi}>{props.makale.dergiAdi}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Cilt/Volume: </Text>
                    <Text style={styles.dergi}>{props.makale.cilt_volume}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Sayi: </Text>
                    <Text style={styles.dergi}>{props.makale.sayi}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Sayfa: </Text>
                    <Text style={styles.dergi}>{props.makale.sayfaNumarasi}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi2, fontWeight:'bold', color:'#738289'}}>DOİ: </Text>
                    <Text style={styles.dergi2}>{props.makale.doi}</Text>
                </View>
            </View>
            <Text style={{...styles.bolum, marginTop: 10}}>Diğer Bilgiler</Text>
            <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>BAP: </Text>
                    <Text style={styles.dergi}>{props.makale.bap ? condTrue : condFalse}</Text>
                </View> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Uluslararası Yayın: </Text>
                    <Text style={styles.dergi}>{props.makale.uluslararasiYayin ? condTrue : condFalse}</Text>
                </View> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Uluslararası İşbirlikli Yayın: </Text>
                    <Text style={styles.dergi}>{props.makale.uluslararasiIsBirlikli ? condTrue : condFalse}</Text>
                </View> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi, fontWeight:'bold', color:'#738289'}}>Endeks Türü: </Text>
                    <Text style={styles.dergi}>{props.makale.endeksTuru}</Text>
                </View> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.dergi2, fontWeight:'bold', color:'#738289'}}>Kurum Dışı Ortak Yazarlı: </Text>
                    <Text style={styles.dergi2}>{props.makale.kurumDisiYazar ? condTrue : condFalse}</Text>
                </View> 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2.5,
        borderColor: '#284985',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor:'#F2F2F2',
        flex: 1
    },
    bolum: {
        fontSize: Dimensions.get('window').height > 600 ? 22 : 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        backgroundColor:'#738289', 
        borderRadius: 10,
        padding: 2,
        color: '#ffffff',
        fontWeight: '500'
    },
    titleContainer: {
        borderBottomWidth: 1.5,
        borderColor: '#738289',
    },
    title: {
        fontSize: Dimensions.get('window').height > 600 ? 18 : 14,
        fontWeight: '500',
        flexShrink: 1,
        marginBottom: 5
    },
    yazar: {
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12,
        fontWeight: '500',
        flexShrink: 1,
        marginBottom: 5
    },
    yil:{
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12, 
        marginBottom: 1,
        fontWeight: '500',
        flexShrink: 1,
        //marginBottom: 5
    },
    dergi :{
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12, 
        marginBottom: 1,
        fontWeight: '500',
        flexShrink: 1,
        marginBottom: 5
    },
    dergi2 :{
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12, 
        marginBottom: 1,
        fontWeight: '500',
        flexShrink: 1,
    }
});

export default MakaleDetay;