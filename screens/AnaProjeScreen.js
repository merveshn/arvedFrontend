import React, { useEffect, useState } from 'react';
import { View, Dimensions, FlatList, Button, Alert, ActivityIndicator, StyleSheet, Text } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardMakale from '../components/CardMakale';

import * as projeAction from '../store/actions/projeAction';

import HeaderButton from '../components/HeaderButton';
import MyButton from '../components/MyButton';

import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const AnaProjeScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.auth.users.userId);
    const projes = useSelector(state => state.proje.projes.filter(pro => pro.userId === ownerId));
    projes.sort((a,b) => parseInt(a.yil) < parseInt(b.yil) ? 1 : -1 );

    const editProjeHandler = id => {
        props.navigation.navigate('Proje', { projeId: id });
    };

    const deleteHandler = id => {
        Alert.alert('Projeyi silmek istediğinize emin misiniz?','', [
          { text: 'Hayır', style: 'default' },
          {
            text: 'Evet',
            style: 'destructive',
            onPress: () => {
              dispatch(projeAction.deleteProje(id));
            }
          }
        ]);
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await dispatch(projeAction.getProje());
            setIsLoading(false);
          };
          loadData();
    }, [dispatch]);

    if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color='#E5C97C' />
          </View>
        );
      }
  
      if(!isLoading && projes.length === 0){
        return(
          <View style={styles.centered}>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>Şuan bir projeniz bulunmamaktadır. Lütfen proje ekleyin.</Text>
          </View>
        );
      }

    return (
        <View style={{flex:1, backgroundColor:'#ffffff'}}>
           <FlatList 
                contentContainerStyle={{marginTop: 10,
                marginHorizontal: Dimensions.get('window').height > 600 ? 10 : 5 }}
                data = {projes}
                keyExtractor = {item => item.projeId}
                renderItem = {itemData => (
                    <CardMakale 
                        yil={itemData.item.yil}
                        title={itemData.item.projeAdi}
                    >
                        <MyButton onPress={() => {
                                    editProjeHandler(itemData.item.projeId)
                                    }}>
                            <Feather name="edit" size={Dimensions.get('window').height > 600 ? 14 : 10} />
                        </MyButton>
                        <MyButton onPress={() => {
                                deleteHandler(itemData.item.projeId)}
                                }>
                            <AntDesign name="delete" size={Dimensions.get('window').height > 600 ? 14 : 10} />
                        </MyButton>
                    </CardMakale>       
                )}
           />
       </View>
    );
}

const styles = StyleSheet.create({
    centered: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
  }
});

AnaProjeScreen.navigationOptions = navData => {
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName='add'
                onPress={() => {
                  navData.navigation.navigate('Proje');
                }}
              />
            </HeaderButtons>
        )
    };
};

export default AnaProjeScreen;