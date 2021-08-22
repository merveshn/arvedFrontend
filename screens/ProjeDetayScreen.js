import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';

import ProjeDetay from '../components/ProjeDetay'

const ProjeDetayScreen = props =>{

    const proje = props.navigation.getParam('proje');

    return(
        <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' contentContainerStyle={{flexGrow: 1, backgroundColor: '#ffffff'}}>
            <ProjeDetay proje={proje}/>
        </ScrollView>
    );
}

export default ProjeDetayScreen;