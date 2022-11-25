import React from "react";
import { NativeBaseProvider } from "native-base";
import Navigation from "./src/router/Navigation";
import { AuthContextProvider } from "./src/contexts/AuthContext";

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
