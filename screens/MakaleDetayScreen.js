import React from 'react';
import { ScrollView } from 'react-native';

import MakaleDetay from '../components/MakaleDetay'

const MakaleDetayScreen = props =>{

    const makale = props.navigation.getParam('makale');

    return(
        <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' contentContainerStyle={{flexGrow: 1, backgroundColor: '#ffffff'}}>
            <MakaleDetay makale={makale}/>
        </ScrollView>
    );
}

export default MakaleDetayScreen;