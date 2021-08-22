import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import { Picker } from '@react-native-community/picker'

import HeaderButton from '../components/HeaderButton';
import TumCard from '../components/TumCard';

import * as makaleAction from '../store/actions/makaleAction';

const TumMakalelerScreen = props => {

  const [yil, setYil] = useState('Tüm Yıllar');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tumMakales = useSelector(state => state.makale.makales);
  tumMakales.sort((a,b) => parseInt(a.yil) < parseInt(b.yil) ? 1 : -1 );
  
  var makales = [];
  if(yil === 'Tüm Yıllar'){
    makales = tumMakales;
  }
  else {
    makales = tumMakales.filter(makale => makale.yil === yil);
  }

  const selectedMakale = (makale) => {
    props.navigation.navigate('MakaleDetay', { makale: makale});
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await dispatch(makaleAction.getMakale())
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

  return(
        <View style={{flex:1, backgroundColor: '#ffffff', alignItems: 'center'}}>
            <View style={styles.pick}>
              <Picker
                selectedValue={yil}
                style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 150 : 150, 
                transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                onValueChange={(itemValue, itemIndex) => setYil(itemValue)}
              >
                <Picker.Item label="Tüm Yıllar" value="Tüm Yıllar" /> 
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2019" value="2019" /> 
                <Picker.Item label="2018" value="2018" /> 
                <Picker.Item label="2017" value="2017" />  
                </Picker>
            </View>
            <FlatList 
              contentContainerStyle={{marginVertical: 10}}
              data = {makales}
              keyExtractor = {item => item.makaleId}
              renderItem = {itemData => (
                <TumCard 
                  title={itemData.item.makaleAdi}
                  yazar={itemData.item.yazarListesi}
                  yil={itemData.item.yil}
                  onPress={() => {
                    selectedMakale(itemData.item)
                  }}
                />
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
  },
  pick: {
    flexDirection: 'row',
    marginTop: 5,
    borderColor: "#284985",
    borderWidth: 2,
    backgroundColor:'#F2F2F2',
    borderRadius: 10,
  }
});

TumMakalelerScreen.navigationOptions = navData => {
    return {
       headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={'md-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
};

export default TumMakalelerScreen;