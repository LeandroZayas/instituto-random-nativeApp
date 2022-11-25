import React, { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import { Box, Center, Text, ScrollView, Button } from "native-base";
import { fetchSinToken } from "../helpers/fetch";
import Post from "../components/Post";

import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuthContext();

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetchSinToken("api/v1/publicaciones");
      const data = await resp.json();
      if (resp.ok) {
        setPosts(data.publicaciones);
        setLoading(false);
      } else {
        setErrors(msg);
      }
    };
    getPosts();
  }, []);

  return (
    <Center style={styles.mainContainer}>
      <Box style={styles.container}>
        <Text 
        color={"#fff"} 
        fontSize={25} 
        fontWeight={"bold"}
        >
          Tablón de Noticias
        </Text>
        <Button
          mt="2"
          colorScheme="green"
          onPress={() => {
            logout();
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>
      {loading ? (
        <Center>
          <Text height={"100%"} fontSize={20}>
            Cargando...
          </Text>
        </Center>
      ) : (
        <ScrollView
          width="100%"
          contentContainerStyle={{ alignItems: "center" }}
        >
          {posts.map((post) => (
            <Post key={post.uid} {...post} />
          ))}
        </ScrollView>
      )}
    </Center>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    marginBottom: 20,
    backgroundColor: "#2f3e46",
    width: "95%",
    height: "15%",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    padding: 5,
    mt: 10,
    mb: 5,
  }

});

export default Home;
