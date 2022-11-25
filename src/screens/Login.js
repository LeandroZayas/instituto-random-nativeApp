import {
  FormControl, Center
} from "native-base";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { fetchSinToken } from "../helpers/fetch";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const { login } = useAuthContext();

  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const onChangeHandler = (name, value) => {
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const resp = await fetchSinToken("api/v1/auth/login", form, "POST");
    const data = await resp.json();

    if (resp.ok) {
      login();
    } else {
      setError(data.errors || [{ param: "database", msg: data.msg }]);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
      <View style={styles.containerPNG}>
          <Image
            source={require('../../assets/instititutoRandom.png')}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <Text style={styles.subtitulo}>Instituto Random</Text>
          <FormControl>
            <Text style={styles.nombresInput}>Correo</Text>
            <TextInput
              style={styles.inputLogin}
              isInvalid={
                error.length != 0 &&
                error.map(
                  (errores) =>
                    errores.param === "correo" ||
                    (errores.param === "database" && true)
                )
              }
              type="text"
              placeholder="example@gmail.com"
              onChangeText={(value) => onChangeHandler("correo", value)}
            />
            {error.length != 0 &&
              error.map(
                (errors) =>
                  errors.param === "correo" && (
                    <Center key={errors.param}>
                      <Text color={"red.500"} fontWeight={"bold"} fontSize={12}>
                        {errors.msg}
                      </Text>
                    </Center>
                  )
              )}
          </FormControl>
          <FormControl>
            <Text style={styles.nombresInput}>Contraseña</Text>
            <TextInput
              style={styles.inputLogin}
              isInvalid={
                error.length != 0 &&
                error.map(
                  (errores) =>
                    errores.param === "password" ||
                    (errores.param === "database" && true)
                )
              }
              type="password"
              placeholder="Ingrese su contraseña"
              onChangeText={(value) => onChangeHandler("password", value)}
            />
            {error.length != 0 &&
              error.map(
                (errors) =>
                  errors.param === "password" && (
                    <Center key={errors.param}>
                      <Text color={"red.500"} fontWeight={"bold"} fontSize={12}>
                        {errors.msg}
                      </Text>
                    </Center>
                  )
              )}
          </FormControl>
          <TouchableOpacity style={styles.containerButton}
            margin={"auto"}
            onPress={handleLogin}
          >
          <LinearGradient
            colors={['#32545e', '#0e2a33']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.text}>Inciar Sesion</Text>
          </LinearGradient>
          </TouchableOpacity>
          {error.length != 0 &&
            error.map(
              (errors) =>
                errors.param === "database" && (
                  <Center key={errors.param}>
                    <Text color={"red.500"} fontWeight={"bold"} fontSize={12}>
                      {errors.msg}
                    </Text>
                  </Center>
                )
            )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPNG: {
    marginTop: 0,
    padding: 0,
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 25,
    color: '#34433D',
    marginBottom: 10,
  },
  nombresInput: {
    fontSize: 14,
    color: '#34433D',
  },
  inputLogin: {
    alignItems: 'center',
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginTop: 15,
    marginBottom:20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2f4f4f',
    borderRadius: 25,


  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    width: 200,


  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30

  }
});

export default Login;
