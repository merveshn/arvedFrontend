import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, TextInput, Button, KeyboardAvoidingView, Alert, Platform, ActivityIndicator} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-community/picker'
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from "formik";
import * as yup from 'yup';

import * as makaleAction from '../store/actions/makaleAction';

import MyButton from '../components/MyButton';

const formSchema = yup.object({
    uluslararasiYayin: yup.boolean(),
    uluslararasiIsBirlikli: yup.boolean(),
    makaleAdi: yup.string()
        .required("Makale Adı boş bırakılamaz.")
        .min(3,'Ad en az 3 karakter olmalıdır.'),
    dergiAdi: yup.string()
        .required("Dergi Adı boş bırakılamaz."),
    yil: yup.string()
        .required("Yıl boş bırakılamaz."),
    cilt_volume: yup.string()
        .required("Cilt/Volume boş bırakılamaz."),
    sayi: yup.string()
        .required("Sayı boş bırakılamaz"),
    sayfaNumarasi: yup.string()
        .required("Sayfa Numarası boş bırakılamaz."),
    doi: yup.string()
        .required("DOİ boş bırakılamaz."),
    bap: yup.boolean(),
    kurumDisiYazar: yup.boolean(),
    yazarListesi: yup.string()
        .required("Yazar Listesi boş bırakılamaz."),
});

const MakaleScreen = (navData) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.users.userId);
    const makId = navData.navigation.getParam('makaleId');
    const makales = useSelector(state => state.makale.makales.find(mak => mak.makaleId === makId));
    
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
                        uluslararasiYayin: makales ? makales.uluslararasiYayin : false,
                        endeksTuru: makales ? makales.endeksTuru : 'Diğer',
                        uluslararasiIsBirlikli: makales ? makales.uluslararasiIsBirlikli : false,
                        makaleAdi: makales ? makales.makaleAdi : '',
                        dergiAdi: makales ? makales.dergiAdi : '',
                        yil: makales ? makales.yil : '2021',
                        cilt_volume: makales ? makales.cilt_volume : '',
                        sayi: makales ? makales.sayi : '',
                        sayfaNumarasi: makales ? makales.sayfaNumarasi : '',
                        doi: makales ? makales.doi : '',
                        bap: makales ? makales.bap : false,
                        kurumDisiYazar: makales ? makales.kurumDisiYazar : false,
                        yazarListesi: makales ? makales.yazarListesi : ''
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        makId ?
                        (dispatch(makaleAction.updateMakale(makId,values))
                            .then(() =>{
                                setIsLoading(false);
                                //Alert.alert('Makale güncellendi.');
                                navData.navigation.navigate('AnaMakale');     
                            })
                            .catch(err => console.log(err)))
                            :
                        (dispatch(makaleAction.createMakale(values))
                            .then(() =>{
                                setIsLoading(false);
                                //Alert.alert('Makale eklendi.');
                                navData.navigation.navigate('AnaMakale');   
                            })
                            .catch(err => console.log(err)))
                    }}
                >
                    {(props) => (
                        <View style={styles.form}>
                         <View style={styles.formGroup}>
                                <View style={styles.checkContainer}>
                                    <Text style={styles.label}>Uluslararası Yayın</Text>
                                    <CheckBox 
                                        value={props.values.uluslararasiYayin} 
                                        onValueChange={value =>  props.setFieldValue('uluslararasiYayin', value)}
                                        tintColors={{ true: '#738289', false: '#738289' }}
                                    />
                                    
                                </View>     
                                <Text style={styles.error}></Text>
                                {(props.values.uluslararasiYayin) &&
                                <View> 
                                    <View style={styles.checkContainer}> 
                                        <Text style={styles.label}>Endeks Türü</Text>
                                        <View style={styles.pick}>
                                            <Picker
                                                selectedValue={props.values.endeksTuru}
                                                style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 120 : 120, 
                                                transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                onValueChange={(itemValue, itemIndex) => props.setFieldValue('endeksTuru', itemValue)}
                                            >
                                                <Picker.Item label="Diğer" value="Diğer" /> 
                                                <Picker.Item label="SCI" value="SCI" />
                                                <Picker.Item label="SSCI" value="SSCI" /> 
                                                <Picker.Item label="A&HCI" value="A&HCI" /> 
                                                <Picker.Item label="SCOPUS" value="SCOPUS" />       
                                            </Picker>
                                        </View>
                                    </View>
                                    <Text style={styles.error}></Text>
                                </View>
                                }
                                {(props.values.uluslararasiYayin) &&
                                <View>
                                    <View style={styles.checkContainer}>
                                        <Text style={styles.label}>Uluslararası İşbirlikli Yayın</Text>
                                        <CheckBox 
                                            value={props.values.uluslararasiIsBirlikli} 
                                            onValueChange={value =>  props.setFieldValue('uluslararasiIsBirlikli', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                        />
                                    </View> 
                                    <Text style={styles.error}></Text>
                                </View>    
                                }
                         </View>
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Makale Adı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("makaleAdi")}
                                onBlur={props.handleBlur('makaleAdi')}
                                value={props.values.makaleAdi}
                            />
                            <Text style={styles.error}>{props.touched.makaleAdi && props.errors.makaleAdi}</Text>                            
                         </View> 
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Dergi Adı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("dergiAdi")}
                                onBlur={props.handleBlur('dergiAdi')}
                                value={props.values.dergiAdi}
                            />
                            <Text style={styles.error}>{props.touched.dergiAdi && props.errors.dergiAdi}</Text>                            
                         </View>
                         <View style={styles.formGroup}>
                            <View style={styles.checkContainer}> 
                                        <Text style={styles.label}>Yıl</Text>
                                        <View style={styles.pick}>
                                            <Picker
                                                selectedValue={props.values.yil}
                                                style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 120 : 110, 
                                                transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                onValueChange={(itemValue, itemIndex) => props.setFieldValue('yil', itemValue)}
                                            >
                                                <Picker.Item label="2021" value="2021" />
                                                <Picker.Item label="2020" value="2020" />
                                                <Picker.Item label="2019" value="2019" /> 
                                                <Picker.Item label="2018" value="2018" /> 
                                                <Picker.Item label="2017" value="2017" />       
                                            </Picker>
                                        </View>
                            </View>
                            <Text style={styles.error}></Text>
                         </View> 
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Cilt/Volume</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("cilt_volume")}
                                onBlur={props.handleBlur('cilt_volume')}
                                value={props.values.cilt_volume}
                            />
                            <Text style={styles.error}>{props.touched.cilt_volume && props.errors.cilt_volume}</Text>                            
                         </View>
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Sayı</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("sayi")}
                                onBlur={props.handleBlur('sayi')}
                                value={(props.values.sayi).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.sayi && props.errors.sayi}</Text>                            
                         </View>
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Sayfa Numarası</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("sayfaNumarasi")}
                                onBlur={props.handleBlur('sayfaNumarasi')}
                                value={(props.values.sayfaNumarasi).toString()}
                                keyboardType='decimal-pad'
                            />
                            <Text style={styles.error}>{props.touched.sayfaNumarasi && props.errors.sayfaNumarasi}</Text>                            
                         </View>
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>DOİ</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("doi")}
                                onBlur={props.handleBlur('doi')}
                                value={props.values.doi}
                            />
                            <Text style={styles.error}>{props.touched.doi && props.errors.doi}</Text>                            
                         </View>
                         <View style={styles.formGroup}>
                            <View style={styles.checkContainer}>
                                        <Text style={styles.label}>BAP Projesinden Üretilen Yayın</Text>
                                        <CheckBox 
                                            value={props.values.bap} 
                                            onValueChange={value =>  props.setFieldValue('bap', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                        />
                            </View>
                            <Text style={styles.error}></Text>
                         </View>     
                         <View style={styles.formGroup}>
                            <View style={styles.checkContainer}>
                                        <Text style={styles.label}>Kurum Dışı Ortak Yazarlı</Text>
                                        <CheckBox 
                                            value={props.values.kurumDisiYazar} 
                                            onValueChange={value =>  props.setFieldValue('kurumDisiYazar', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                        />
                            </View>
                            <Text style={styles.error}></Text>
                         </View>    
                
                         <View style={styles.formGroup}>
                            <Text style={styles.label}>Yazar Listesi</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange("yazarListesi")}
                                onBlur={props.handleBlur('yazarListesi')}
                                value={props.values.yazarListesi}
                            />
                            <Text style={styles.error}>{props.touched.yazarListesi && props.errors.yazarListesi}</Text>                            
                         </View> 
                
{/*
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Yazar Listesi</Text>
                            {  
                                props.values.yazarListesi.map((text,index) => (
                                    <View 
                                      key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7)}
                                      style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, width: '100%'}}> 
                                        <TextInput
                                        style={{...styles.input, width:'70%' }}
                                        key={index}
                                        onChangeText={props.handleChange(`yazarListesi[${index}]`)}
                                        onBlur={props.handleBlur(`yazarListesi[${index}]`)}
                                        value={props.values.yazarListesi[index]}
                                        />
                                    </View>
                            ))       
                            }
                       
                        <View style={styles.buttonContainer}>
                            <Button title="Yazar Ekle" onPress={() => props.setFieldValue('yazarListesi', [...props.values.yazarListesi, ""])} />
                        </View>
                         </View>
*/}            
                        { !makId &&
                         <View style={styles.buttonContainer}>
                             <MyButton onPress={props.handleSubmit} >
                                 Ekle
                             </MyButton>
                         </View>
                        }
                        {
                         makId &&
                         <View style={styles.buttonContainer}>
                             <MyButton onPress={props.handleSubmit} >
                                 Güncelle
                             </MyButton>
                         </View>
                        }
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
      checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontSize: Dimensions.get('window').height > 600 ? 16 : 12
      },
      pick: {
        borderColor: "#738289",
        borderWidth: 1.5,
        backgroundColor:'#F2F2F2',
        borderRadius: 10
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

export default MakaleScreen;