import { VStack, Text, Stack } from "native-base";

const Comment = ({ _id, autor, created_at, descripcion }) => {
  return (
    <VStack
      backgroundColor={"white"}
      marginTop={5}
      padding={2.5}
      borderRadius={10}
      key={_id}
    >
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
      <Stack>
        <Text marginTop={2.5}>{descripcion}</Text>
      </Stack>
    </VStack>
  );
};

export default Comment;
