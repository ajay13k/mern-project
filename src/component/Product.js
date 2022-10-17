import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Button,
  Spacer,
  HStack,
  Text,
  Input,
  Center,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
const Product = () => {
  const [data, setdata] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemperPage, setitemperPage] = useState(5);
  const indexoflastitem = currentPage * itemperPage;
  console.log(indexoflastitem);
  const indexoffirstitem = indexoflastitem - itemperPage;
  console.log(indexoffirstitem);
  const currentItems = data.slice(indexoffirstitem, indexoflastitem);
  console.log(currentItems);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemperPage); i++) {
    pages.push(i);
  }

  const getProduct = async () => {
    const data = await axios.get("http://localhost:3600/api/product/get");
    setdata(data.data.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handelDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:3600/api/product/delete/${id}`
    );
    if (response) {
      getProduct();
    }
  };
  const handelSearch = async (item) => {
    const result = await axios.get(
      `http://localhost:3600/api/product/search/${item}`
    );
    if (result) {
      setdata(result.data);
    } else {
      getProduct();
    }
  };

  const handleClick = (id) => {};

  return (
    <>
      <Navbar />
      <TableContainer>
        <HStack>
          {" "}
          <Heading p={4}>Product Table</Heading>
          <Spacer />
          <Center pr={300}>
            {" "}
            <Input
              placeholder="search products"
              onChange={(e) => {
                handelSearch(e.target.value);
              }}
              w={400}
            ></Input>
          </Center>
          <Text pr={30}>
            {" "}
            <NavLink to="/addproduct">Add Product</NavLink>
          </Text>
        </HStack>

        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>price</Th>
              <Th>Category</Th>
              <Th>description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((data, index) => {
              return (
                <>
                  <Tr key={index}>
                    <Td>{data.name}</Td>
                    <Td>{data.price}</Td>data
                    <Td>{data.category}</Td>
                    <Td>{data.description}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          handelDelete(data._id);
                        }}
                      >
                        Delete
                      </Button>
                      <NavLink to={"/update/" + data._id}>
                        <Button>Edit</Button>
                      </NavLink>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {pages.map((number) => {
        return (
          <>
            <li
              key={number}
              id={number}
              onClick={(e) => {
                handleClick(e.target.id);
              }}
            >
              {number}
            </li>
          </>
        );
      })}
    </>
  );
};

export default Product;
