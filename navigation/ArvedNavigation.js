import React from 'react';
import { SafeAreaView, Button, View, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PersonelBilgileriScreen from '../screens/PersonelBilgileriScreen';
import AnaMakaleScreen from '../screens/AnaMakaleScreen';
import MakaleScreen from '../screens/MakaleScreen';
import AnaProjeScreen from '../screens/AnaProjeScreen'; 
import ProjeScreen from '../screens/ProjeScreen';
import TumMakalelerScreen from '../screens/TumMakalelerScreen';
import TumProjelerScreen from '../screens/TumProjelerScreen';
import MakaleDetayScreen from '../screens/MakaleDetayScreen';
import ProjeDetayScreen from '../screens/ProjeDetayScreen';
import TumPersonelScreen from '../screens/TumPersonelScreen';
import PersonelDetayScreen from '../screens/PersonelDetayScreen'

import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../store/actions/authAction';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: '#284985'
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: Dimensions.get('window').height > 600 ? 20 : 14 
    },
    headerTintColor: '#E5C97C'
  };

const AuthNavigator = createStackNavigator({
    Login: { screen:LoginScreen,
      navigationOptions: {
          headerShown: false
      }
  },
  Register: { screen:RegisterScreen,
        navigationOptions: {
            headerShown: false
        }
  },
},{
  defaultNavigationOptions: defaultNavOptions
});

const ProfileNavigator = createStackNavigator({
    Home: { screen:HomeScreen },
    PersonelBilgileri: {screen:PersonelBilgileriScreen, navigationOptions: {
      headerTitle: 'Personel Bilgilerim'
    }},
    AnaMakale: {screen:AnaMakaleScreen, navigationOptions: {
      headerTitle: 'Makalelerim/Derlemelerim'
    }},
    AnaProje: {screen:AnaProjeScreen, navigationOptions: {
      headerTitle: 'Projelerim'
    }},
    Makale: {screen:MakaleScreen, navigationOptions: {
      headerTitle: 'Makale/Derleme'
    }},
    Proje: {screen:ProjeScreen, navigationOptions: {
      headerTitle: 'Proje'
    }}
},{ 
    navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name='person-outline'
            size={23}
            color={drawerConfig.tintColor}
          />
        )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const TumMakaleNavigator = createStackNavigator({
  TumMakale: {screen: TumMakalelerScreen,  navigationOptions: {
    headerTitle: 'Tüm Makaleler'
  }},
  MakaleDetay: {screen: MakaleDetayScreen, navigationOptions: {
    headerTitle: 'Makale Detayı'
  }}
},{
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <MaterialCommunityIcons
          name='file-document-edit-outline'
          size={25}
          color={drawerConfig.tintColor}
        />
      )
    },
  defaultNavigationOptions: defaultNavOptions
});

const TumProjeNavigator = createStackNavigator({
  TumProje: {screen: TumProjelerScreen,  navigationOptions: {
    headerTitle: 'Tüm Projeler'
  }},
  ProjeDetay: {screen: ProjeDetayScreen, navigationOptions: {
    headerTitle: 'Proje Detayı'
  }}
},{
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <FontAwesome5
          name='tools'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
  defaultNavigationOptions: defaultNavOptions
});

const TumPersonelNavigator = createStackNavigator({
  TumPersonel: {screen: TumPersonelScreen,  navigationOptions: {
    headerTitle: 'Tüm Personeller'
  }},
  PersonelDetay: {screen: PersonelDetayScreen, navigationOptions: {
    headerTitle: 'Personel Detayı'
  }}
},{
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <AntDesign
          name="idcard"
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
  defaultNavigationOptions: defaultNavOptions
});

const GenelNavigator = createDrawerNavigator({
    Profile: {screen: ProfileNavigator, navigationOptions: {
      title: 'Onay Bekleyenler'
    }},
    TumPersonel: {screen: TumPersonelNavigator, navigationOptions: {
      title: 'Tüm Personeller'
    }},
    TumMakale: {screen: TumMakaleNavigator, navigationOptions: {
      title: 'Tüm Makaleler'
    }},
    TumProje: {screen: TumProjeNavigator, navigationOptions: {
      title: 'Tüm Projeler'
    }}
},{
    contentOptions: {
      activeTintColor: '#284985',
      labelStyle : {
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12
      }
    },
    contentComponent: props => {

        const dispatch = useDispatch();
        const name = useSelector(state => state.auth.users.userName);
         
        return (
          (name === 'Admin0614')  ?  
          (
          <View style={{flex: 1, paddingTop: 30}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <DrawerItems {...props} />
              <Button title='Çıkış' color='#284985' onPress={() =>{
                  dispatch(authAction.logout());
                  props.navigation.navigate('Login');
              }}/>
            </SafeAreaView>
          </View>
          )
          :
            null
        );
    }
}
);

const AnaNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Genel: GenelNavigator
});

export default createAppContainer(AnaNavigator);