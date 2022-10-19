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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "./config";

function UpdateProduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const data = {
    name: name,
    price: price,
    category: category,
    description: description,
  };
  const getbyidProduct = async () => {
    await axios.get(`${API.productbyid}/${params.id}`).then((response) => {
      setname(response.data.data.name);
      setprice(response.data.data.name);
      setcategory(response.data.data.name);
      setdescription(response.data.data.name);
    });
  };

  useEffect(() => {
    getbyidProduct();
  }, []);

  const updateProduct = async () => {
    const result = await axios.put(`${API.updateproduct}/${params.id}`, data);
    if (result) {
      navigate("/product");
    }
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
                      value={name}
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
                      value={price}
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
                  value={category}
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
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    placeholder="Here is a sample placeholder"
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  
                  onClick={updateProduct}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  UpdateProduct
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default UpdateProduct;
