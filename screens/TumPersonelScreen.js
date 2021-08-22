import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MainButton from '../components/MainButton';

import * as personelBilgileriAction from '../store/actions/personelBilgileriAction';

const TumPersonelScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const perData = useSelector(state => state.personelBilgileri.perData.filter(per => per.fullName !== ''));

    const selectedPersonel = (personel) => {
        props.navigation.navigate('PersonelDetay', { personel: personel });
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await dispatch(personelBilgileriAction.getPersonelBilgileri());
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
        <View style={{flex:1, backgroundColor: '#ffffff'}}>
            <FlatList 
              contentContainerStyle={{marginVertical: 10}}
              data = {perData}
              keyExtractor = {item => item.userId}
              renderItem = {itemData => (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{itemData.item.fullName}</Text>
                    </View>
                    <View style={{justifyContent:'flex-end'}}>
                        <MainButton onPress={() => { selectedPersonel(itemData.item)}}>
                            Detay
                        </MainButton>
                    </View>
               </View>
              )}
            />
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
        justifyContent: 'center',
        width: '80%'
    },
    title: {
        fontSize: Dimensions.get('window').height > 600 ? 18 : 14,
        fontWeight: '500',
        marginBottom: 5,
        flexShrink: 1,
    },
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

TumPersonelScreen.navigationOptions = navData => {
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

export default TumPersonelScreen;