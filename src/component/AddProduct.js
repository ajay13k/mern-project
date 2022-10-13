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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  const data = {
    name: name,
    price: price,
    category: category,
    description: description,
  };

  const creatProduct = async () => {
    await axios
      .post("http://localhost:3600/api/product/create", data)
      .then((response) => {
        if (response) {
          navigate("/product");
          alert("product created successfuly");
        }
      });
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Textarea
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    placeholder="Here is a sample placeholder"
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={creatProduct}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
export default Addproduct;
