import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, TextInput, Button, KeyboardAvoidingView, Alert, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from "formik";
import * as yup from 'yup';

import * as perBilAction from '../store/actions/personelBilgileriAction';

import MyButton from '../components/MyButton';

const formSchema = yup.object({
    fullName: yup.string()
        .required("Ad boş bırakılamaz.")
        .min(3,'Ad en az 3 karakter olmalıdır.'),
    wosHIndex: yup.string()
        .required("WOS H Index boş bırakılamaz."),
    wosAtifSayisi: yup.string()
        .required("WOS Atıf Sayısı boş bırakılamaz."),
    scopusHIndex: yup.string()
        .required("Scopus H Index boş bırakılamaz."),
    scopusAtifSayisi: yup.string()
        .required("Scopus Atıf Sayısı boş bırakılamaz."),
    uzmanlikAlani: yup.string()
        .required("Uzmanlık Alanı boş bırakılamaz."),
});

const PersonelBilgileriScreen = (navData) => {

    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.auth.users.userId);
    const theUser = useSelector(state => state.personelBilgileri.perData.find(user => user.userId === userId ));
    const dispatch = useDispatch();
    
    if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color='#E5C97C' />
          </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"} 
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <ScrollView 
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{flexGrow: 1}}>
                <Formik
                    initialValues={{
                        fullName: theUser.fullName,
                        wosHIndex: theUser.wosHIndex,
                        wosAtifSayisi: theUser.wosAtifSayisi,
                        scopusHIndex: theUser.scopusHIndex,
                        scopusAtifSayisi: theUser.scopusAtifSayisi,
                        uzmanlikAlani: theUser.uzmanlikAlani
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        dispatch(perBilAction.updatePersonelBilgileri(values))
                            .then(() => {
                                setIsLoading(false);
                                //Alert.alert('Personel bilgileri kaydedildi.');  
                                navData.navigation.navigate('Home');     
                            })
                            .catch(err => console.log(err)); 
                    }}
                >
                    {(props) => (
                        <View style={styles.form}>
                           <View style={styles.formGroup}>
                            <Text style={styles.label}>Öğretim Elemanı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("fullName")}
                                onBlur={props.handleBlur('fullName')}
                                value={props.values.fullName}
                            />
                            <Text style={styles.error}>{props.touched.fullName && props.errors.fullName}</Text>                            
                           </View> 
                           
                           <View style={styles.formGroup}>
                            <Text style={styles.label}>WOS H Index</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("wosHIndex")}
                                onBlur={props.handleBlur('wosHIndex')}
                                value={(props.values.wosHIndex).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.wosHIndex && props.errors.wosHIndex}</Text>
                           </View>

                           <View style={styles.formGroup}>
                            <Text style={styles.label}>WOS Atıf Sayısı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("wosAtifSayisi")}
                                onBlur={props.handleBlur('wosAtifSayisi')}
                                value={(props.values.wosAtifSayisi).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.wosAtifSayisi && props.errors.wosAtifSayisi}</Text>
                           </View>

                           <View style={styles.formGroup}>
                            <Text style={styles.label}>Scopus H Index</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("scopusHIndex")}
                                onBlur={props.handleBlur('scopusHIndex')}
                                value={(props.values.scopusHIndex).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.scopusHIndex && props.errors.scopusHIndex}</Text>
                           </View>

                           <View style={styles.formGroup}>
                            <Text style={styles.label}>Scopus Atıf Sayısı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("scopusAtifSayisi")}
                                onBlur={props.handleBlur('scopusAtifSayisi')}
                                value={(props.values.scopusAtifSayisi).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.scopusAtifSayisi && props.errors.scopusAtifSayisi}</Text>
                           </View>

                           <View style={styles.formGroup}>
                            <Text style={styles.label}>Uzmanlık Alanı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("uzmanlikAlani")}
                                onBlur={props.handleBlur('uzmanlikAlani')}
                                value={props.values.uzmanlikAlani}
                            />                            
                           </View> 

{/*
                           <View style={styles.formGroup}> 
                                <Text style={styles.label}>Uzmanlık Alanı</Text>
                                {
                                    props.values.uzmanlikAlani.map(({text},index) => (
                                    <View
                                    key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7)}
                                    style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, width: '100%'}}> 
                                        <TextInput
                                            style={{...styles.input, width:'65%' }}
                                            key={index}
                                            onChangeText={props.handleChange(`uzmanlikAlani[${index}]`)}
                                            onBlur={props.handleBlur(`uzmanlikAlani[${index}]`)}
                                            value={props.values.uzmanlikAlani[index]}
                                        />
                                        <Button key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7)} 
                                                title="Uzmanlık Sil" 
                                                onPress={() => {
                                                props.values.uzmanlikAlani.pop();
                                                props.setFieldValue('uzmanlikAlani', [...props.values.uzmanlikAlani])}} 
                                        />
                                  </View>
                                ))
                                }
                           </View>

                           <View style={styles.buttonContainer}>
                            <Button title="Uzmanlık ekle" onPress={() => props.setFieldValue('uzmanlikAlani', [...props.values.uzmanlikAlani, " "])} />
                           </View>
*/}
                           <View style={styles.buttonContainer}>
                             <MyButton onPress={props.handleSubmit} >
                                 Kaydet
                             </MyButton>
                           </View>

                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    form: {
        borderWidth: 2.5,
        borderColor: '#284985',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor:'#ffffff',
        flex: 1
      },
      formGroup: {
        width: "100%",
        backgroundColor: '#ffffff'
      },
      label: {
        marginVertical: 5,
        fontWeight: 'bold',
        color:'#738289',
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12
      },
      input: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderColor: "#738289",
        borderWidth: 1.5,
        backgroundColor:'#F2F2F2',
        fontWeight: '500',
        borderRadius: 10,
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12,
      },
      buttonContainer: {
        marginTop: 20,
        alignItems: 'flex-end',
      },
      error: {
          color: 'red',
          fontWeight: '500',
          fontSize: Dimensions.get('window').height > 600 ? 10 : 8
      },
      centered: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      }
});

export default PersonelBilgileriScreen;