import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/Card';
import HOMESDATA from '../models/homeModel';
import HeaderButton from '../components/HeaderButton';
import CardOnay from '../components/CardOnay';
import MyButton from '../components/MyButton';

import * as authActions from '../store/actions/authAction';
import * as onayActions from '../store/actions/onayAction';

const HomeScreen = props => {
  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onays = useSelector(state => state.onay.onayUser);
  const name = useSelector(state => state.auth.users.userName);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await dispatch(onayActions.getUserOnay());
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

  if(!isLoading && onays.length === 0 && name === 'Admin0614'){
    return(
      <ImageBackground
      source={require('../assets/images/universite.png')}
      style={styles.image}
      >
        <View style={{flexGrow: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.6)' }}> 
          <View style={styles.centered}>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>Şuan onay bekleyen bir kullanıcı bulunmamaktadır.</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if(name === 'Admin0614'){
    return (
      <ImageBackground
        source={require('../assets/images/universite.png')}
        style={styles.image}
      >
        <View style={{flexGrow: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.6)' }}>    
          <FlatList  
            contentContainerStyle={{marginTop: 10,
            marginHorizontal: Dimensions.get('window').height > 600 ? 10 : 5 }}
            data = {onays}
            keyExtractor={item => item.email}
            renderItem = {itemData => (
                <CardOnay
                  name={itemData.item.name}
                  surname={itemData.item.surname}
                  email={itemData.item.email}
                >
                    <MyButton onPress={async () => {
                                    await dispatch(authActions.registerUser(itemData.item))
                                    dispatch(onayActions.deleteUserOnay(itemData.item.email))
                                    }}>
                            Kabul
                    </MyButton>
                    <MyButton onPress={() => {
                                    dispatch(onayActions.deleteUserOnay(itemData.item.email))
                                    }}>
                            Red
                    </MyButton>
                </CardOnay>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
    
  return(
      <ImageBackground 
        source={require('../assets/images/universite.png')}
        style={styles.image}
        >
          <FlatList contentContainerStyle={{flexGrow: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.6)' }}
              data = {HOMESDATA}
              keyExtractor={item => item.title}
              renderItem={ itemData => (
                  <Card 
                      image={itemData.item.imageUrl}
                      title={itemData.item.title}
                      onSelect={() => {props.navigation.navigate(itemData.item.nav)}}
                  />
              )}
          />
      </ImageBackground>
    );
};

HomeScreen.navigationOptions = navData => {
    const user = navData.navigation.getParam('user');
    if(user.name === 'Admin0614')
    {
      return {
        headerTitle: 'Admin',
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
        )
      };
    }
    else{
      return {
        headerTitle: user.name,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cik"
              iconName={'exit-outline'}
              onPress={() => {
                navData.navigation.navigate('Login');
              }}
            />
          </HeaderButtons>
        )
      };
    }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.6)'
  }
});

export default HomeScreen;