import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => setdata(data);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dataobj, setdata] = useState([]);
  const [err, seterror] = useState(false);
  const navigate = useNavigate();
  const data = { email, password };
  const login = async () => {
    axios
      .post(`${API.login}`, dataobj)

      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          navigate("/navbar");
          alert("user login successfully");
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        if (dataobj.email && dataobj.password) {
          alert("user details are not correct");
        }
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email.length === 0 && password.length === 0) {
  //     seterror(true);
  //   }
  // };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login with your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  })}
                  name="email"
                  type="text"
                  // onChange={(e) => {
                  //   setemail(e.target.value);
                  // }}
                />
                <FormControl color="red">
                  {errors.email?.type === "required" && "email is required"}
                </FormControl>
                <FormControl color="red">
                  {errors.email?.type === "pattern" &&
                    "email  must be a valid format"}
                </FormControl>
                {/* {err && email.length <= 0 ? (
                  <FormHelperText color="red">email is required</FormHelperText>
                ) : (login
                )} */}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register("password", {
                    required: true,
                    // minLength: 5,
                    // maxLength: 10,
                    pattern:
                      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                  })}
                  name="password"
                  type="password"
                  // onChange={(e) => {
                  //   setpassword(e.target.value);
                  // }}
                />

                <FormControl color="red">
                  {errors.password?.type === "required" &&
                    "password is required"}
                </FormControl>
                {/* <FormControl color="red">
                  {errors.password?.type === "minLength" &&
                    "minLength should be five"}
                </FormControl>
                <FormControl color="red">
                  {errors.password?.type === "maxLength" &&
                    "maxLength should be ten"}
                </FormControl> */}
                <FormControl color="red">
                  {errors.password?.type === "pattern" &&
                    " password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"}
                </FormControl>
                {/* {err && password.length <= 0 ? (
                  <FormHelperText color="red">
                    password is required
                  </FormHelperText>
                ) : (
                  ""
                )} */}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  onClick={login}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
