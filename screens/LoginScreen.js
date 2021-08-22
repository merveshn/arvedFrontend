import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Platform, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import * as authAction from '../store/actions/authAction';
import * as perBilAction from '../store/actions/personelBilgileriAction';

const formSchema = yup.object({
    email: yup.string()
        .email("Geçerli bir email girin.")
        .required("Email boş bırakılamaz."),
    password: yup
        .string()
        .required("Şifre boş bırakılamaz.")
        .min(6, "")
});

const LoginScreen = navData => {

  const [isLoading, setIsLoading] = useState(false);
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
    >
    <ScrollView
    keyboardDismissMode='on-drag'
     keyboardShouldPersistTaps='always'
     contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          dispatch(authAction.loginUser(values))
          .then((result) => {
            if(result.success){
              setIsLoading(false);
              if(result.data.name !== 'Admin0614' ){
                dispatch(perBilAction.createPersonelBilgileri(result.data.id));
              }
              navData.navigation.navigate('Home', {user: result.data});
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
                <Image source={require('../assets/images/arved_logo.png')} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
              <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Giriş</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Hesabınız yok mu? </Text>
                <TouchableOpacity
                    onPress={() => navData.navigation.navigate('Register')}
                >
                  <Text style={styles.registerButton}>Kaydolun</Text>
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
    marginBottom: 120,
    width: 80,
    height: 80
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
    paddingVertical: 16,
    flexDirection: "row",
    marginBottom: 20
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

export default LoginScreen;