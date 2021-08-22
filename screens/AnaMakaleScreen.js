import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardMakale from '../components/CardMakale';

import * as makaleAction from '../store/actions/makaleAction';

import HeaderButton from '../components/HeaderButton';
import MyButton from '../components/MyButton';

import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const AnaMakaleScreen = props => {
    
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.auth.users.userId);
    const makales = useSelector(state => state.makale.makales.filter(mak => mak.userId === ownerId));
    makales.sort((a,b) => parseInt(a.yil) < parseInt(b.yil) ? 1 : -1 );

    const editMakaleHandler = id => {
        props.navigation.navigate('Makale', { makaleId: id });
    };

    const deleteHandler = id => {
        Alert.alert('Makaleyi silmek istediğinize emin misiniz?','', [
          { text: 'Hayır', style: 'default' },
          {
            text: 'Evet',
            style: 'destructive',
            onPress: () => {
              dispatch(makaleAction.deleteMakale(id));
            }
          }
        ]);
    };

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);
        await dispatch(makaleAction.getMakale());
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

    if(!isLoading && makales.length === 0){
      return(
        <View style={styles.centered}>
            <Text style={{textAlign: 'center', fontWeight: '500'}}>Şuan bir makaleniz bulunmamaktadır. Lütfen makale ekleyin.</Text>
        </View>
      );
    }
   
    return(
       <View style={{flex:1, backgroundColor:'#ffffff'}}>
           <FlatList 
                contentContainerStyle={{marginTop: 10,
                marginHorizontal: Dimensions.get('window').height > 600 ? 10 : 5 }}
                data = {makales}
                keyExtractor = {item => item.makaleId}
                renderItem = {itemData => (
                    <CardMakale 
                        yil={itemData.item.yil}
                        title={itemData.item.makaleAdi}
                    >
                        <MyButton onPress={() => {
                                    editMakaleHandler(itemData.item.makaleId)
                                    }}>
                            <Feather name="edit" size={Dimensions.get('window').height > 600 ? 14 : 10} />
                         </MyButton>
                         <MyButton onPress={() => {
                                deleteHandler(itemData.item.makaleId)}
                          }>
                            <AntDesign name="delete" size={Dimensions.get('window').height > 600 ? 14 : 10} />
                         </MyButton>
                    </CardMakale>       
                )}
           />
       </View>
    );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
}
});

AnaMakaleScreen.navigationOptions = navData => {
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName='add'
                onPress={() => {
                  navData.navigation.navigate('Makale');
                }}
              />
            </HeaderButtons>
        )
    };
};

export default AnaMakaleScreen;