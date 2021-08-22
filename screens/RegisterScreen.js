import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/authAction';
import * as perBilAction from '../store/actions/personelBilgileriAction';
import * as onayActions from '../store/actions/onayAction';

const formSchema = yup.object({
    name: yup.string()
        .required("Ad boş bırakılamaz.")
        .min(3,'Ad en az 3 karakter olmalıdır.'),
    surname:  yup.string()
    .required("Soyad boş bırakılamaz.")
    .min(2, 'Soyad en az 2 karakter olmalıdır.'),
    email: yup.string()
        .email("Geçerli bir email girin.")
        .required("Email boş bırakılamaz."),
    password: yup
        .string()
        .required("Şifre boş bırakılamaz.")
        .min(6, "Şifre en az 6 karakter olmalıdır.")
  });

const RegisterScreen = navData => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color='#E5C97C' />
      </View>
    );
  }

   return(
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
       <ScrollView 
       keyboardDismissMode='on-drag'
       keyboardShouldPersistTaps='always'
       contentContainerStyle={{flexGrow: 1}}>
        <Formik
            initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
                setIsLoading(true);
                //dispatch(authActions.registerUser(values))
                dispatch(onayActions.createUserOnay(values))
                .then((result) => {
                if(result.success){
                  setIsLoading(false);
                  //dispatch(perBilAction.createPersonelBilgileri(result.data.id));
                  //navData.navigation.navigate('Home', {user: result.data});
                  Alert.alert('Kayıt isteği yöneticiye iletildi. Onaydan sonra giriş yapabilirsiniz.');
                }
                else {
                  setIsLoading(false);
                  Alert.alert(result.message);
                }
              })
              .catch(err => console.log(err));  
            }}
        >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/images/arved_logo.png')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ad"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
              <Text style={styles.error}>
                {props.touched.name && props.errors.name}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Soyad"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("surname")}
                value={props.values.surname}
                onBlur={props.handleBlur("surname")}
              />
              <Text style={styles.error}>
                {props.touched.surname && props.errors.surname}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Kaydol</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Hesabınız var mı? </Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate("Login")}
                >
                  <Text style={styles.registerButton}>Giriş</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
  </ScrollView>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
    logo: {
      alignItems: "center",
      marginBottom: 90,
      marginTop: 50,
      width: 80,
      height: 80,
    },
    inputContainer: {
      alignItems: "center"
    },
    input: {
      width: 275,
      backgroundColor: "#B6BFC4",
      borderRadius: 25,
      padding: 10,
      fontSize: 16,
    },
    button: {
      width: 150,
      backgroundColor: "#738289",
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#ffffff",
      textAlign: "center",
    },
    registerContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      flexDirection: "row",
      marginBottom: 50
    },
    registerText: {
      color: "#738289",
      fontSize: 14,
    },
    registerButton: {
      color: "#738289",
      fontSize: 14,
      fontWeight: "bold",
    },
    error: {
      color: 'red',
      fontSize: 12,
      paddingHorizontal: 15
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  
  export default RegisterScreen;
  