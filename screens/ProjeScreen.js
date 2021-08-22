import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, TextInput, Button, KeyboardAvoidingView, Alert, Platform, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-community/picker'
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from "formik";
import * as yup from 'yup';

import * as projeAction from '../store/actions/projeAction';

import MyButton from '../components/MyButton';

const formSchema = yup.object({
    bap: yup.boolean(),
    uluslararasi: yup.boolean(),
    yil: yup.string()
        .required("Yıl boş bırakılamaz."),
    projeDurumu: yup.string()
        .required("Proje Durumu boş bırakılamaz."),
    projeTuru: yup.string()
        .required("Proje Türü boş bırakılamaz."),
    alanBilgisi: yup.string()
        .required("Alan Bilgisi boş bırakılamaz."),
    projeAdi: yup.string()
        .required("Proje Adı boş bırakılamaz.")
        .min(3,'Proje Ado en az 3 karakter olmalıdır.'),
    projeButcesi: yup.string()
        .required("Proje Bütçesi boş bırakılamaz."),
    paraBirimi: yup.string()
        .required("Para Birimi boş bırakılamaz."),
    kontratliProje: yup.boolean(),
    disDestekli: yup.boolean(),
    uluslararasiIsBirlikli: yup.boolean(), 
    arastirmaciSayisi: yup.string()
        .required("Araştırmacı Sayısı boş bırakılamaz."),
    projeYurutucusu: yup.string()
        .required("Proje Yürütücüsü boş bırakılamaz."),
});

const ProjeScreen = navData => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.users.userId);
    const proId = navData.navigation.getParam('projeId');
    const projes = useSelector(state => state.proje.projes.find(pro => pro.projeId === proId));

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
                        bap: projes ? projes.bap : false,
                        uluslararasi: projes ? projes.uluslararasi : false,
                        yil: projes ? projes.yil : '2021',
                        projeDurumu: projes ? projes.projeDurumu : "Devam Ediyor",
                        projeTuru: projes ? projes.projeTuru : "Diğer",
                        alanBilgisi: projes ? projes.alanBilgisi : "Diğer",
                        projeAdi: projes ? projes.projeAdi : "",
                        projeButcesi: projes ? projes.projeButcesi : "",
                        paraBirimi: projes ? projes.paraBirimi : "TL",
                        kontratliProje: projes ? projes.kontratliProje : false,
                        disDestekli: projes ? projes.disDestekli : false,
                        uluslararasiIsBirlikli: projes ? projes.uluslararasiIsBirlikli : false,
                        arastirmaciSayisi: projes ? projes.arastirmaciSayisi : "",
                        projeYurutucusu: projes ? projes.projeYurutucusu : ""
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        proId ?
                        (dispatch(projeAction.updateProje(proId,values))
                            .then(() =>{
                                setIsLoading(false);
                                //Alert.alert('Proje güncellendi.');
                                navData.navigation.navigate('AnaProje');  
                            })
                            .catch(err => console.log(err)))
                            :
                        (dispatch(projeAction.createProje(values))
                            .then(() =>{
                                setIsLoading(false);
                                //Alert.alert('Proje eklendi.');
                                navData.navigation.navigate('AnaProje');  
                            })
                            .catch(err => console.log(err)))
                    }}
                >
                    {(props) =>(
                        <View style={styles.form}>
                            <View style={styles.formGroup}>
                                <View>
                                    <View style={styles.checkContainer}>
                                        <Text style={styles.label}>Kurum İçi Proje (BAP)</Text>
                                            <CheckBox 
                                                value={props.values.bap} 
                                                onValueChange={value =>  props.setFieldValue('bap', value)}
                                                tintColors={{ true: '#738289', false: '#738289' }}
                                            />
                                    </View>
                                    <Text style={styles.error}></Text>
                                </View>
                                {(!props.values.bap) &&
                                    <View>
                                        <View style={styles.checkContainer}>
                                        <Text style={styles.label}>Uluslararası Proje</Text>
                                            <CheckBox 
                                                value={props.values.uluslararasi} 
                                                onValueChange={value =>  props.setFieldValue('uluslararasi', value)}
                                                tintColors={{ true: '#738289', false: '#738289' }}
                                            />
                                        </View>
                                        <Text style={styles.error}></Text>
                                     </View>
                                }
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
                                <View style={styles.checkContainer}> 
                                            <Text style={styles.label}>Proje Durumu</Text>
                                            <View style={styles.pick}>
                                                <Picker
                                                    selectedValue={props.values.projeDurumu}
                                                    style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 170 : 150, 
                                                    transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                    itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                    onValueChange={(itemValue, itemIndex) => props.setFieldValue('projeDurumu', itemValue)}
                                                >
                                                    <Picker.Item label="Devam Ediyor" value="Devam Ediyor" />
                                                    <Picker.Item label="Tamamlandı" value="Tamamlandı" />
                                                </Picker>
                                            </View>
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}> 
                                            <Text style={styles.label}>Proje Türü</Text>
                                            <View style={styles.pick}>
                                                <Picker
                                                    selectedValue={props.values.projeTuru}
                                                    style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 170 : 150, 
                                                    transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                    itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                    onValueChange={(itemValue, itemIndex) => props.setFieldValue('projeTuru', itemValue)}
                                                >
                                                    <Picker.Item label="Diğer" value="Diğer" />
                                                    <Picker.Item label="Diğer2" value="Diğer2" />
                                                </Picker>
                                            </View>
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}> 
                                            <Text style={styles.label}>Alan Bilgisi</Text>
                                            <View style={styles.pick}>
                                                <Picker
                                                    selectedValue={props.values.alanBilgisi}
                                                    style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 120 : 110, 
                                                    transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                    itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                    onValueChange={(itemValue, itemIndex) => props.setFieldValue('alanBilgisi', itemValue)}
                                                >
                                                    <Picker.Item label="Diğer" value="Diğer" />
                                                    <Picker.Item label="Fen" value="Fen" />
                                                    <Picker.Item label="Sağlık" value="Sağlık" />
                                                    <Picker.Item label="Sosyal" value="Sosyal" />
                                                </Picker>
                                            </View>
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Proje Adı</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={props.handleChange("projeAdi")}
                                    onBlur={props.handleBlur('makaleAdi')}
                                    value={props.values.projeAdi}
                                />
                                <Text style={styles.error}>{props.touched.projeAdi && props.errors.projeAdi}</Text>                            
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Proje Bütçesi</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={props.handleChange("projeButcesi")}
                                    onBlur={props.handleBlur('projeButcesi')}
                                    value={(props.values.projeButcesi).toString()}
                                    keyboardType='decimal-pad'
                                />
                                <Text style={styles.error}>{props.touched.projeButcesi && props.errors.projeButcesi}</Text>                            
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}> 
                                            <Text style={styles.label}>Para Birimi</Text>
                                            <View style={styles.pick}>
                                                <Picker
                                                    selectedValue={props.values.paraBirimi}
                                                    style={{ height: Dimensions.get('window').height > 600 ? 40 : 35, width: Dimensions.get('window').height > 600 ? 120 : 110, 
                                                    transform: [{ scaleX: Dimensions.get('window').height > 600 ? 1 : 0.8 }, { scaleY: Dimensions.get('window').height > 600 ? 1 : 0.8 }]}}
                                                    itemStyle={{ fontSize: Dimensions.get('window').height > 600 ? 16 : 12 , fontWeight: '500'}}
                                                    onValueChange={(itemValue, itemIndex) => props.setFieldValue('paraBirimi', itemValue)}
                                                >
                                                    <Picker.Item label="TL" value="TL" />
                                                    <Picker.Item label="Dolar" value="Dolar" />
                                                    <Picker.Item label="Euro" value="Euro" />
                                                </Picker>
                                            </View>
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}>
                                    <Text style={styles.label}>Kontratlı Proje</Text>
                                        <CheckBox 
                                            value={props.values.kontratliProje} 
                                            onValueChange={value =>  props.setFieldValue('kontratliProje', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                       />
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}>
                                    <Text style={styles.label}>Dış Destekli Proje</Text>
                                        <CheckBox 
                                            value={props.values.disDestekli} 
                                            onValueChange={value =>  props.setFieldValue('disDestekli', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                        />
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.checkContainer}>
                                    <Text style={styles.label}>Uluslararasi İşbirlikli Proje</Text>
                                        <CheckBox 
                                            value={props.values.uluslararasiIsBirlikli} 
                                            onValueChange={value =>  props.setFieldValue('uluslararasiIsBirlikli', value)}
                                            tintColors={{ true: '#738289', false: '#738289' }}
                                        />
                                </View>
                                <Text style={styles.error}></Text>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Araştırmacı Sayısı</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={props.handleChange("arastirmaciSayisi")}
                                    onBlur={props.handleBlur('arastirmaciSayisi')}
                                    value={(props.values.arastirmaciSayisi).toString()}
                                    keyboardType='decimal-pad'
                                />
                                <Text style={styles.error}>{props.touched.arastirmaciSayisi && props.errors.arastirmaciSayisi}</Text>                            
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Proje Yürütücüsü</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={props.handleChange("projeYurutucusu")}
                                    onBlur={props.handleBlur('projeYurutucusu')}
                                    value={props.values.projeYurutucusu}
                                />
                                <Text style={styles.error}>{props.touched.projeYurutucusu && props.errors.projeYurutucusu}</Text>                            
                            </View>

                            { !proId &&
                               <View style={styles.buttonContainer}>
                                    <MyButton onPress={props.handleSubmit} >
                                        Ekle
                                    </MyButton>
                               </View>
                            }
                            {
                              proId &&
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

export default ProjeScreen;