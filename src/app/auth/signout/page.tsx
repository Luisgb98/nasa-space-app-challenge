"use client";

import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import signout from "./sign-out";

export default function SignOut() {
  return (
    <Center
      textAlign="center"
      flex={1}
      flexDir={"column"}
      height={"92vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      py={10}
      px={6}
    >
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        You are trying to sign out
      </Heading>
      <Text color={"gray.500"}>
        Are you sure you want to sign out? You will need to sign in again to
        access your account.
      </Text>
      <form action={signout}>
        <Stack spacing={10}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            marginTop={5}
            type="submit"
          >
            Sign out
          </Button>
        </Stack>
      </form>
    </Center>
  );
}
