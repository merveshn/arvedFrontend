import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const PersonelDetay = props => {

    const personel = props.navigation.getParam('personel');

    return(
        <ScrollView 
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#ffffff'}}>
           <View style={styles.container}>
           <Text style={styles.bolum}>Personel Bilgileri</Text>
            <View style={styles.titleContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.title, fontWeight:'bold', color:'#738289'}}>Adı: </Text> 
                        <Text style={styles.title}>{personel.fullName}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.yazar, fontWeight:'bold', color:'#738289'}}>WOS H Index: </Text>
                        <Text style={styles.yazar}>{personel.wosHIndex}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.yazar, fontWeight:'bold', color:'#738289'}}>WOS Atıf Sayısı: </Text>
                        <Text style={styles.yazar}>{personel.wosAtifSayisi}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.yazar, fontWeight:'bold', color:'#738289'}}>Scopus H Index: </Text>
                        <Text style={styles.yazar}>{personel.scopusHIndex}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.yazar, fontWeight:'bold', color:'#738289'}}>Scopus Atıf Sayısı: </Text>
                        <Text style={styles.yazar}>{personel.scopusAtifSayisi}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...styles.yil, fontWeight:'bold', color:'#738289'}}>Uzmanlık Alanı: </Text>
                        <Text style={styles.yil}>{personel.uzmanlikAlani}</Text>
                    </View>
                </View>
           </View>
        </ScrollView>
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
        marginBottom: 10,
        fontWeight: '500',
        flexShrink: 1,
        //marginBottom: 5
    },
});

export default PersonelDetay;