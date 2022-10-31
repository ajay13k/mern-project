import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "./config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState(false);
  const [er, seter] = useState("");

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  const creatUser = async () => {
    await axios.post(`${API.signup}`, data).then((response) => {
      if (response) {
        alert("user created successfuly");
      }
    });
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0 ||
      password.length == 0
    ) {
      seterr(true);
    }

    if (firstName.match("^[a-zA-Z ]*$")) {
      seterr(true);
    } else {
      const err = (
        <FormHelperText color="red">
          {" "}
          firstname must be alphab\
        </FormHelperText>
      );
      seter(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handelsubmit}>
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setfirstName(e.target.value);
                      }}
                    />
                    {err && firstName.length <= 0 ? (
                      <FormHelperText color="red">
                        firstname is required
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                    {er}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setlastName(e.target.value);
                      }}
                    />
                    {err && lastName.length <= 0 ? (
                      <FormHelperText color="red">
                        lastname is required
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                {err && email.length <= 0 ? (
                  <FormHelperText color="red">email is required</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {err && password.length <= 0 ? (
                  <FormHelperText color="red">
                    password is required
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  onClick={creatUser}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Signup;
