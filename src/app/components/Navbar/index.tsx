"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { GetUserResponseDto } from "@/lib/dtos/users/get/get-user-response-dto";
import signin from "@/app/auth/signin/sign-in";
import signup from "@/app/auth/signup/sign-up";
import signout from "@/app/auth/signout/sign-out";

interface Props {
  children: React.ReactNode;
}

interface NavProps {
  user: GetUserResponseDto | null;
}

export default function Nav(props: NavProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const {
    isOpen: isSignOutOpen,
    onOpen: onSignOutOpen,
    onClose: onSignOutClose,
  } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          h={16}
          position={"relative"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Text fontWeight={900} fontSize="20px">AstrON</Text>

          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              {props.user ? (
                <MenuList>
                  <MenuItem>{props.user.email}</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onSignOutOpen}>Sign out</MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem onClick={onSignInOpen}>Sign in</MenuItem>
                  <MenuItem onClick={onSignUpOpen}>Sign up</MenuItem>
                </MenuList>
              )}
            </Menu>
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
          </Box>
        ) : null}
      </Box>

      {/* Sign In Modal */}
      <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add the sign-in form here */}
            <form action={signin}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  onClick={() => onSignInClose()}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add the sign-up form here */}
            <form action={signup}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                  type="submit"
                  onClick={() => onSignUpClose()}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign Out Modal */}
      <Modal isOpen={isSignOutOpen} onClose={onSignOutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to sign out?</Text>
            <Flex justifyContent={"end"}>
              <form action={signout}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                  }}
                  width={30}
                  type="submit"
                  marginRight={4}
                  onClick={() => onSignOutClose()}
                >
                  Yes
                </Button>
              </form>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                width={30}
                onClick={() => onSignOutClose()}
              >
                No
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
