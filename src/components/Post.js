import { VStack, Text, Stack, Image, HStack } from "native-base";
import Comment from "./Comment";

const Post = ({ uid, autor, created_at, descripcion, comentario }) => {
  return (
    <Stack
      backgroundColor={"#dfe4dc"}
      width="90%"
      borderRadius={10}
      mx={5}
      marginBottom={5}
      padding={5}
      key={uid}
    >
      <HStack alignItems={"center"}>
        <Image
          width={10}
          height={10}
          borderRadius={50}
          marginRight={2.5}
          source={{
            uri: `https://res.cloudinary.com/dawjd5cx8/image/upload/${autor.avatar}`,
          }}
          alt={autor.avatar}
        />
        <VStack>
          <Stack>
            <Text fontWeight={"bold"}>{autor.nombre}</Text>
          </Stack>
          <Stack>
            <Text fontStyle={"italic"} fontSize={12}>
              {created_at}
            </Text>
          </Stack>
        </VStack>
      </HStack>
      <Stack>
        <Text my={5}>{descripcion}</Text>
        <Text fontStyle={"italic"} fontSize={12}>
          Comentarios ({comentario.length})
        </Text>
      </Stack>
      <VStack>
        {comentario.map((item) => (
          <Comment key={item._id} {...item} />
        ))}
      </VStack>
    </Stack>
  );
};

export default Post;
