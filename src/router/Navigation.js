import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { LOGGED_IN, LOADING } from "../contexts/AuthContext";

//screens
import { Home, Login } from "../screens/index";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { loggedState } = useAuthContext();

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {LOADING && loggedState === LOGGED_IN ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
